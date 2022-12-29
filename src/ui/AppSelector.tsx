import React from 'react'
import { Config } from '../config'
import { useEffect, useState } from 'react'
import { AppInfo, AppConfig } from '../types'
import { AppPresenter } from './AppPresenter'
import { ProposalAction } from '@peerme/core-ts'
import { AppSelectorItem } from './AppSelectorItem'

type NotificationType = 'success' | 'info' | 'warning' | 'error' | 'vibe'

type Props = {
  config: AppConfig
  onAppSelected?: (app: AppInfo | null) => void
  onActionAddRequest: (action: ProposalAction) => void
  onNotificationRequest: (text: string, type: NotificationType) => void
}

export const AppSelector = (props: Props) => {
  const [activeApp, setActiveApp] = useState<AppInfo | null>(null)

  const availableApps = Config.AvailableApps.filter((app) => app.Enabled)

  useEffect(() => {
    if (props.onAppSelected) props.onAppSelected(activeApp)
  }, [activeApp])

  return (
    <section>
      {activeApp === null && (
        <header className="mb-4">
          <h2 className="mb-1">Third-party Apps</h2>
          <p className="text-xl">
            Fellowship DAOs can interact easily interact with the third-party apps you love the most.
          </p>
        </header>
      )}
      {activeApp ? (
        <AppPresenter {...props} app={activeApp} onCloseRequest={() => setActiveApp(null)} />
      ) : (
        <ul className="flex flex-wrap">
          {availableApps.map((app) => (
            <li key={app.Name} className="w-full md:w-1/2 p-2">
              <AppSelectorItem app={app} onClick={() => setActiveApp(app)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
