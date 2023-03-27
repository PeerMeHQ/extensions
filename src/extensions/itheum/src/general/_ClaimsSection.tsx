import { ClaimInfo } from '../types'
import { BigNumber } from 'bignumber.js'
import React, { useEffect } from 'react'
import { Contracts } from '../contracts'
import { AppHook } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'
import { toFormattedTokenAmount, useScQuery } from '@peerme/core-ts'

const OrderedClaimTypeNames = ['Rewards', 'Airdrops', 'Allocations', 'Royalties']

export const _ClaimsSection = (props: { app: AppHook }) => {
  const [claimInfos, setClaimInfos] = React.useState<ClaimInfo[]>([])
  const contracts = Contracts(props.app.config)

  const claimsScQuery = useScQuery(props.app.config.walletConfig, contracts.ViewClaimWithDate)

  useEffect(() => {
    claimsScQuery.query([props.app.config.entity.address]).then((bundle) => setClaimInfos(toTypedClaimInfos(bundle)))
  }, [])

  const handleClaim = (index: number) =>
    props.app.requestProposalAction(contracts.Claim.Address, contracts.Claim.Endpoint, 0, [index], [])

  return (
    <AppSection title="Claims">
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 list-none">
        {claimInfos.map((claimInfo, index) => (
          <li className="col-span-1">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-6 py-4">
              <h2 className="text-base mb-1">{OrderedClaimTypeNames[index]}</h2>
              <strong className="font-head text-4xl text-primary-500 dark:text-primary-400">
                {toFormattedTokenAmount(claimInfo.amount, 18)}
              </strong>
              {!claimInfo.amount.isZero() && (
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

const toTypedClaimInfos = (bundle: any): ClaimInfo[] =>
  bundle.firstValue
    ?.valueOf()
    .map(
      (item: any) =>
        ({
          amount: new BigNumber(item.amount),
          lastModified: item.date.toNumber() * 1000,
        } as ClaimInfo)
    )
    .slice(0, OrderedClaimTypeNames.length)
