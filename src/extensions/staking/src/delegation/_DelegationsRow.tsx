import { Config } from '../config'
import { _Withdrawer } from './_Withdrawer'
import { StickyModal } from '@peerme/web-ui'
import { toEgldDisplayAmount } from '../helpers'
import React, { SyntheticEvent, useState } from 'react'
import { useApp } from '../../../../shared/hooks/useApp'
import { DelegationInfo, DelegationProvider } from '../types'

type Props = {
  delegation: DelegationInfo
  provider: DelegationProvider | null
}

export const _DelegationsRow = (props: Props) => {
  if (!props.provider) return null
  const app = useApp()
  const [isOpen, setIsOpen] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  const handleWithdraw = (e: SyntheticEvent) => {
    e.stopPropagation()
    setIsWithdrawing(true)
  }

  const handleRewardClaim = (e: SyntheticEvent) => {
    e.stopPropagation()
    app.requestProposalAction(props.provider!.contract, Config.Endpoints.ClaimRewards, 0, [], [])
  }

  const handleRewardStake = (e: SyntheticEvent) => {
    e.stopPropagation()
    app.requestProposalAction(props.provider!.contract, Config.Endpoints.ReDelegateRewards, 0, [], [])
  }

  return (
    <tr
      role="button"
      onClick={() => setIsOpen((current) => !current)}
      className="flex w-full hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <td className="flex-grow px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {!!props.provider && (
          <div className="flex">
            <div className="flex items-center">
              <img
                src={props.provider.identity.avatar}
                alt={props.provider.identity.name + ' Staking Provider Avatar'}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-4"
              />
            </div>
            <div className="flex-grow text-left">
              <h3 className="text-lg text-black dark:text-white">{props.provider.identity.name}</h3>
              <span className="text-sm text-gray-500">APR: {props.provider.apr}%</span>
            </div>
          </div>
        )}
        {isOpen && (
          <div className="flex gap-4 pt-2 text-base">
            <button onClick={handleWithdraw} className="text-blue-500 hover:text-blue-400 px-2 py-1">
              Withdraw
            </button>
            <button onClick={handleRewardClaim} className="text-blue-500">
              Claim Rewards
            </button>
            <button onClick={handleRewardStake} className="text-blue-500">
              Stake Rewards
            </button>
          </div>
        )}
        <StickyModal open={isWithdrawing} onClose={() => setIsWithdrawing(false)}>
          <_Withdrawer provider={props.provider} delegation={props.delegation} />
        </StickyModal>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {toEgldDisplayAmount(props.delegation.userActiveStake)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {toEgldDisplayAmount(props.delegation.claimableRewards)}
      </td>
    </tr>
  )
}
