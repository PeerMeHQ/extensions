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
          <h2 className="mb-1">Apps</h2>
          <p className="text-xl mb-2">Peering DAOs can easily interact with the apps you love the most.</p>
          {props.config.hasEarlyAccess && (
            <Input
              placeholder="Search Apps ..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              autoComplete="off"
              autoFocus
            />
          )}
        </header>
      )}
      {activeApp ? (
        <_AppPresenter {...props} extension={activeApp} onCloseRequest={() => setActiveApp(null)} />
      ) : (
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableApps.map((app) => (
              <li key={app.Name}>
                <_AppSelectorItem config={props.config} extension={app} onClick={() => setActiveApp(app)} />
              </li>
            ))}
          </ul>
          <footer className="mt-4">
            <small className="text-base text-gray-500">
              Learn how to create your own app in the{' '}
              <a
                href={Config.KnowledgeBase.Extensions}
                target="_blank"
                rel="noopener"
                className="text-blue-500 hover:text-blue-600 hover:cursor-pointer"
                style={{ border: 0 }}
              >
                Knowledge Base
              </a>
              .
            </small>
          </footer>
        </div>
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
