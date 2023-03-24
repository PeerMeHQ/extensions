import React, { useState } from 'react'
import { toEgldDisplayAmount } from '../helpers'
import { DelegationInfo, DelegationProvider } from '../types'

type Props = {
  delegation: DelegationInfo
  provider: DelegationProvider | null
}

export const _ActiveDelegationRow = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)

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
          <div className="flex-grow text-left">
            <h3 className="text-lg text-black dark:text-white">Delegation Details</h3>
            <span className="text-sm text-gray-500">APR: {props.provider?.apr}%</span>
          </div>
        )}
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
