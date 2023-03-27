import { Input } from '@peerme/web-ui'
import React, { useState } from 'react'
import { _Delegator } from './_Delegator'
import { DelegationProvider } from '../types'
import { AppHook } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'
import { _DelegateProviderList } from './_DelegateProviderList'

type Props = {
  app: AppHook
  providers: DelegationProvider[]
  className?: string
}

export const DelegateSection = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProvider, setSelectedProvider] = useState<DelegationProvider | null>(null)
  const filteredProviders = filterProviders(props.providers, searchQuery)

  const resetSelectedProvider = () => setSelectedProvider(null)

  return (
    <AppSection
      title="Stake now"
      onCloseRequest={selectedProvider ? resetSelectedProvider : undefined}
      className={props.className}
    >
      {selectedProvider ? (
        <_Delegator app={props.app} provider={selectedProvider} />
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
          <_DelegateProviderList providers={filteredProviders} onSelect={(val) => setSelectedProvider(val)} />
        </>
      )}
    </AppSection>
  )
}

const filterProviders = (providers: DelegationProvider[], query: string) =>
  providers
    .filter((p) => p.identity.name && p.identity.url)
    .filter((p) => p.identity.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (a.identity.name > b.identity.name ? 1 : -1))
    .sort((a, b) => (a.featured ? -1 : 1))
