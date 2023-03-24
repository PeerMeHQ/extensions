import { Config } from './config'
import { DelegationInfo } from './types'
import { toEgldDisplayAmount } from './helpers'
import { getDelegationInfoRequest } from './api'
import React, { useEffect, useState } from 'react'
import { AppHook } from '../../../shared/hooks/useApp'
import { AppSection } from '../../../shared/ui/elements'
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers'

type Props = {
  app: AppHook
  className?: string
}

export const _OverviewSection = (props: Props) => {
  const delegationNetworkProvider = new ApiNetworkProvider(Config.Urls.Delegation(props.app.config.network))
  const [delegationInfo, setDelegationInfo] = useState<DelegationInfo | null>(null)
  const hasClaimableRewards = delegationInfo?.claimableRewards?.isGreaterThan(0) || false

  useEffect(() => {
    fetchDelegationProviders()
  }, [])

  const fetchDelegationProviders = async () =>
    setDelegationInfo(await getDelegationInfoRequest(delegationNetworkProvider, props.app.config.entity.address))

  return (
    <AppSection title="Overview" className={props.className}>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
        <li className="col-span-1">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-6 py-4">
            <h2 className="text-base mb-1">Our Stake</h2>
            <strong className="font-head text-4xl text-primary-500 dark:text-primary-400">
              {delegationInfo ? toEgldDisplayAmount(delegationInfo.userActiveStake) : '-'}
            </strong>
          </div>
        </li>
        <li className="col-span-1">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-6 py-4">
            <h2 className="text-base mb-1">Claimable Rewards</h2>
            <strong className="block font-head text-4xl text-primary-500 dark:text-primary-400">
              {delegationInfo ? toEgldDisplayAmount(delegationInfo.claimableRewards) : '-'}
            </strong>
            {hasClaimableRewards && (
              <div className="mt-2">
                <button
                  type="button"
                  className="relative inline-flex justify-center items-center text-lg px-3 py-1 rounded-xl transition duration-400 tracking-wide text-white bg-blue-500 hover:bg-blue-600"
                >
                  Claim
                </button>
              </div>
            )}
          </div>
        </li>
      </ul>
    </AppSection>
  )
}
