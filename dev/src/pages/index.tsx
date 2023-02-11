import Head from 'next/head'
import { Setup } from '@/setup'
import { useState } from 'react'
import { Switch, Input } from '@peerme/web-ui'
import { classNames, EntityTag } from '@peerme/core-ts'
import { AppSelector, WidgetInfoPresenter } from '../../../lib'

export default function Home() {
  const [dark, setDark] = useState(false)
  const [entityTag, setEntityTag] = useState('')

  return (
    <div className={dark ? 'dark bg-gray-800' : 'bg-gray-100'}>
      <Head>
        <title>PeerMe Extensions Development</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={classNames('min-h-screen w-screen max-w-4xl mx-auto pb-4')}>
        <header className="px-8 py-4 flex space-x-8">
          <div className="flex items-center space-x-2">
            <span className="text-xl text-gray-500">Dark Mode</span>
            <Switch label="Dark Mode" checked={dark} onChange={(val) => setDark(val)} />
          </div>
          <div>
            <Input pre="#" placeholder="Active Tag" value={entityTag} onChange={(val) => setEntityTag(val)} />
          </div>
        </header>
        <main className="rounded-2xl mt-8">
          <h2 className="block rounded-xl -ml-16 mb-2">App Selector 👇</h2>
          <p className="mb-2">Shown in the app gallery while creating a proposal.</p>
          <section className={classNames('mb-8 p-8 rounded-2xl', dark ? 'bg-gray-900' : 'bg-gray-50')}>
            <AppSelector
              config={Setup.Config}
              onActionAddRequest={(action) => alert('Requested Action:' + JSON.stringify(action))}
              onNotificationRequest={(text, type) => alert(`${type} -> ${text}`)}
              onAppSelected={() => {}}
            />
          </section>
          <h2 className="block rounded-xl -ml-16 mb-2">
            Widget - Info 👇 <span className="text-2xl">[Active Tag: {entityTag || 'None'}]</span>
          </h2>
          <p className="mb-2">Shown on the DAO Info page if DAO is tagged with same tag as widget.</p>
          <section className={classNames('mb-8 p-8 rounded-2xl', dark ? 'bg-gray-900' : 'bg-gray-50')}>
            <WidgetInfoPresenter
              config={{
                ...Setup.Config,
                entity: {
                  ...Setup.Config.entity,
                  tags: [entityTag as EntityTag],
                },
              }}
            />
          </section>
        </main>
      </div>
    </div>
  )
}
