import { Config } from './config'
import { Input } from '@peerme/web-ui'
import { DelegationProvider } from './types'
import React, { useEffect, useState } from 'react'
import { getDelegationProvidersRequest } from './api'
import { AppHook } from '../../../shared/hooks/useApp'
import { AppSection } from '../../../shared/ui/elements'
import { _ProviderList } from './provider/_ProviderList'
import { _ProviderStaker } from './provider/_ProviderStaker'
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers'

type Props = {
  app: AppHook
}

export const _DelegateSection = (props: Props) => {
  const delegationNetworkProvider = new ApiNetworkProvider(Config.Urls.Delegation(props.app.config.network))
  const [providers, setProviders] = useState<DelegationProvider[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProvider, setSelectedProvider] = useState<DelegationProvider | null>(null)
  const filteredProviders = filterProviders(providers, searchQuery)

  useEffect(() => {
    getDelegationProvidersRequest(delegationNetworkProvider).then((p) => setProviders(p))
  }, [])

  const resetSelectedProvider = () => setSelectedProvider(null)

  return (
    <AppSection title="Stake now" onCloseRequest={selectedProvider ? resetSelectedProvider : undefined}>
      {selectedProvider ? (
        <_ProviderStaker app={props.app} provider={selectedProvider} />
      ) : (
        <>
          <header className="mb-4">
            <Input
              placeholder="Search ..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              autoComplete="off"
            />
          </header>
          <_ProviderList providers={filteredProviders} onSelect={(val) => setSelectedProvider(val)} />
        </>
      )}
    </AppSection>
  )
}

const filterProviders = (providers: DelegationProvider[], query: string) =>
  providers
    .filter((p) => p.identity.name)
    .filter((p) => p.identity.name.toLowerCase().includes(query.toLowerCase()))
    .filter((p) => p.identity.url)
    .sort((a, b) => (a.identity.name > b.identity.name ? 1 : -1))
    .sort((a, b) => (a.featured ? -1 : 1))
