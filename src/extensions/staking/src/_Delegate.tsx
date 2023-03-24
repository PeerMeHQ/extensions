import { Config } from './config'
import { Input } from '@peerme/web-ui'
import { DelegationProvider } from './types'
import { toEgldDisplayAmount } from './helpers'
import React, { useEffect, useState } from 'react'
import { getDelegationProvidersRequest } from './api'
import { AppHook } from '../../../shared/hooks/useApp'
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers'

type Props = {
  app: AppHook
}

export const _Delegate = (props: Props) => {
  const delegationNetworkProvider = new ApiNetworkProvider(Config.Urls.Delegation(props.app.config.network))
  const [providers, setProviders] = useState<DelegationProvider[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProvider, setSelectedProvider] = useState<DelegationProvider | null>(null)
  const filteredProviders = filterProviders(providers, searchQuery)

  useEffect(() => {
    fetchDelegationProviders()
  }, [])

  const fetchDelegationProviders = async () =>
    setProviders(await getDelegationProvidersRequest(delegationNetworkProvider))

  return (
    <div>
      <header className="mb-4">
        <Input
          placeholder="Search ..."
          value={searchQuery}
          onChange={(val) => setSearchQuery(val)}
          autoComplete="off"
        />
      </header>
      <table className="min-w-full">
        <thead className="block bg-gray-200 dark:bg-gray-700 rounded-xl">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
          {filteredProviders.map((provider) => (
            <tr
              role="button"
              tabIndex={0}
              aria-selected={provider.contract === selectedProvider?.contract}
              onClick={() => setSelectedProvider(provider)}
            >
              <td className="flex px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center">
                  <img
                    src={provider.identity.avatar}
                    alt={provider.identity.name + ' Staking Provider Avatar'}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-4"
                  />
                </div>
                <div className="flex-grow text-left">
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
    </div>
  )
}

const filterProviders = (providers: DelegationProvider[], query: string) =>
  providers
    .filter((p) => p.identity.name)
    .filter((p) => p.identity.name.toLowerCase().includes(query.toLowerCase()))
    .filter((p) => p.identity.url)
    .sort((a, b) => (a.identity.name > b.identity.name ? 1 : -1))
    .sort((a, b) => (a.featured ? -1 : 1))

const calculateProviderFilledPercentage = (provider: DelegationProvider) =>
  provider.totalActiveStake.div(provider.maxDelegationCap).times(100)
