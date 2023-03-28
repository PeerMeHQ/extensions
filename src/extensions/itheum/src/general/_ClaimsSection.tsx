import { Config } from '../config'
import { ClaimInfo } from '../types'
import React, { useEffect } from 'react'
import { Contracts } from '../contracts'
import { toTypedClaimInfo } from '../helpers'
import { AppHook } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'
import { classNames, toFormattedTokenAmount, useScQuery } from '@peerme/core-ts'

export const _ClaimsSection = (props: { app: AppHook }) => {
  const [claimInfos, setClaimInfos] = React.useState<ClaimInfo[]>([])
  const contracts = Contracts(props.app.config)

  const claimsScQuery = useScQuery(props.app.config.walletConfig, contracts.ViewClaimWithDate)

  useEffect(() => {
    claimsScQuery.query([props.app.config.entity.address]).then((bundle) => {
      const values = bundle.firstValue?.valueOf().map(toTypedClaimInfo)
      if (!values) return
      setClaimInfos(values.slice(0, Config.Claims.OrderedTypeNames.length))
    })
  }, [])

  const handleClaim = (index: number) =>
    props.app.requestProposalAction(contracts.Claim.Address, contracts.Claim.Endpoint, 0, [index], [])

  return (
    <AppSection title="Claims">
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 list-none">
        {claimInfos.map((claimInfo, index) => (
          <li key={index} className="col-span-1">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-6 py-4">
              <h2 className="text-base mb-1">{Config.Claims.OrderedTypeNames[index]}</h2>
              <strong
                className={classNames(
                  'font-head text-4xl',
                  claimInfo.amount.isZero()
                    ? 'text-gray-600 dark:text-gray-400'
                    : 'text-primary-500 dark:text-primary-400'
                )}
              >
                {toFormattedTokenAmount(claimInfo.amount, Config.TokenDecimals)}
              </strong>
              {!claimInfo.amount.isZero() && (
                <button
                  onClick={() => handleClaim(index)}
                  className="block text-base text-primary-500 hover:text-primary-400 px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-lg mt-2"
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
