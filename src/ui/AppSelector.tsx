import React from 'react'
import { Config } from '../config'
import { Input } from '@peerme/web-ui'
import { useEffect, useState } from 'react'
import { _AppPresenter } from './_AppPresenter'
import { _AppSelectorItem } from './_AppSelectorItem'
import { ExtensionInfo, ExtensionConfig } from '../types'
import { ProposalAction, useDebounce } from '@peerme/core-ts'

type NotificationType = 'success' | 'info' | 'warning' | 'error' | 'vibe'

type Props = {
  config: ExtensionConfig
  onAppSelected?: (app: ExtensionInfo | null) => void
  onActionAddRequest: (action: ProposalAction) => void
  onNotificationRequest: (text: string, type: NotificationType) => void
}

export const AppSelector = (props: Props) => {
  const [activeApp, setActiveApp] = useState<ExtensionInfo | null>(null)
  const [availableApps, setAvailableApps] = useState(getAvailableApps(props.config))
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 200)

  useEffect(() => {
    if (props.onAppSelected) props.onAppSelected(activeApp)
  }, [activeApp])

  useEffect(() => {
    setAvailableApps(getSearchResults(props.config, debouncedSearchQuery))
  }, [debouncedSearchQuery])

  return (
    <section>
      {activeApp === null && (
        <header className="mb-4">
          <h2 className="mb-1">Third-party Apps</h2>
          <p className="text-xl mb-2">
            Peering DAOs can interact easily interact with the third-party apps you love the most.
          </p>
          {props.config.hasEarlyAccess && (
            <Input placeholder="Search Apps ..." value={searchQuery} onChange={(val) => setSearchQuery(val)} />
          )}
        </header>
      )}
      {activeApp ? (
        <_AppPresenter {...props} app={activeApp} onCloseRequest={() => setActiveApp(null)} />
      ) : (
        <ul className="flex flex-wrap">
          {availableApps.map((app) => (
            <li key={app.Name} className="w-full md:w-1/2 p-2">
              <_AppSelectorItem app={app} onClick={() => setActiveApp(app)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

const getAvailableApps = (config: ExtensionConfig) =>
  Config.Extensions.filter((app) => app.Enabled || config.hasEarlyAccess)

const getSearchResults = (config: ExtensionConfig, query: string) =>
  query.length === 0
    ? getAvailableApps(config)
    : getAvailableApps(config).filter((app) => app.Name.toLowerCase().includes(query.toLowerCase()))
