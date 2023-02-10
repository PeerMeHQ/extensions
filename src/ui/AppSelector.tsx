import React from 'react'
import { Config } from '../config'
import { useEffect, useState } from 'react'
import { _AppPresenter } from './_AppPresenter'
import { ProposalAction } from '@peerme/core-ts'
import { ExtensionInfo, ExtensionConfig } from '../types'
import { _AppSelectorItem } from './_AppSelectorItem'

type NotificationType = 'success' | 'info' | 'warning' | 'error' | 'vibe'

type Props = {
  config: ExtensionConfig
  onAppSelected?: (app: ExtensionInfo | null) => void
  onActionAddRequest: (action: ProposalAction) => void
  onNotificationRequest: (text: string, type: NotificationType) => void
}

export const AppSelector = (props: Props) => {
  const [activeApp, setActiveApp] = useState<ExtensionInfo | null>(null)

  const availableApps = Config.Extensions.filter((app) => app.Enabled || props.config.hasEarlyAccess)

  useEffect(() => {
    if (props.onAppSelected) props.onAppSelected(activeApp)
  }, [activeApp])

  return (
    <section>
      {activeApp === null && (
        <header className="mb-4">
          <h2 className="mb-1">Third-party Apps</h2>
          <p className="text-xl">
            Peering DAOs can interact easily interact with the third-party apps you love the most.
          </p>
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
