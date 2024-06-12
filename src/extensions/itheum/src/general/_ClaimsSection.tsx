import { clsx } from 'clsx'
import { Config } from '../config'
import { ClaimInfo } from '../types'
import React, { useEffect } from 'react'
import { Contracts } from '../contracts'
import { toTypedClaimInfo } from '../helpers'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'
import { toFormattedTokenAmount, useScQuery } from '@peerme/core-ts'

export function _ClaimsSection() {
  const app = useApp()
  const [claimInfos, setClaimInfos] = React.useState<ClaimInfo[]>([])
  const contracts = Contracts(app.config)

  const claimsScQuery = useScQuery(app.config.network, contracts.ViewClaimWithDate)

  useEffect(() => {
    claimsScQuery.query([app.config.entity.address]).then((bundle) => {
      const values = bundle.firstValue?.valueOf().map(toTypedClaimInfo)
      if (!values) return
      setClaimInfos(values.slice(0, Config.Claims.OrderedTypeNames.length))
    })
  }, [])

  const handleClaim = (index: number) =>
    app.requestProposalAction(contracts.Claim.Address, contracts.Claim.Endpoint, 0n, [index], [])

  return (
    <AppSection title="Claims">
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 list-none">
        {claimInfos.map((claimInfo, index) => (
          <li key={index} className="col-span-1">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-6 py-4">
              <h2 className="text-base mb-1">{Config.Claims.OrderedTypeNames[index]}</h2>
              <strong
                className={clsx(
                  'font-head text-4xl',
                  claimInfo.amount === 0n
                    ? 'text-gray-600 dark:text-gray-400'
                    : 'text-primary-500 dark:text-primary-400'
                )}
              >
                {toFormattedTokenAmount(claimInfo.amount, Config.TokenDecimals)}
              </strong>
              {claimInfo.amount > 0 && (
                <button
                  onClick={() => handleClaim(index)}
                  className="block text-base text-primary-400 hover:text-primary-500 px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-lg mt-2"
                >
                  Claim
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </AppSection>
  )
}
