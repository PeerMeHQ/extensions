import React from 'react'
import { DelegationProvider } from '../types'
import { toEgldDisplayAmount } from '../helpers'

type Props = {
  providers: DelegationProvider[]
  onSelect: (provider: DelegationProvider) => void
}

export const _DelegateProviderList = (props: Props) => (
  <table className="min-w-full">
    <thead className="block bg-gray-200 dark:bg-gray-700 rounded-t-xl rounded-b">
      <tr className="flex w-full">
        <th
          scope="col"
          className="flex-grow px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Provider
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          APR
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Fee
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Filled
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Remaining
        </th>
      </tr>
    </thead>
    <tbody className="block divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto">
      {props.providers.map((provider) => (
        <tr
          key={provider.contract}
          role="button"
          onClick={() => props.onSelect(provider)}
          className="flex w-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <td className="flex-grow flex px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            <div className="flex items-center">
              <img
                src={provider.identity.avatar}
                alt={provider.identity.name + ' Staking Provider Avatar'}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-4"
              />
            </div>
            <div className="text-left">
              <h3 className="text-lg text-black dark:text-white">{provider.identity.name}</h3>
              <span className="text-sm text-gray-500">{provider.identity.url}</span>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.apr}%</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{+provider.serviceFee / 100}%</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {provider.maxDelegationCap.isZero()
              ? 'Uncapped'
              : calculateProviderFilledPercentage(provider).toFixed(2) + '%'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {provider.maxDelegateAmountAllowed.isZero()
              ? 'Uncapped'
              : toEgldDisplayAmount(provider.maxDelegateAmountAllowed)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

const calculateProviderFilledPercentage = (provider: DelegationProvider) =>
  provider.totalActiveStake.div(provider.maxDelegationCap).times(100)
