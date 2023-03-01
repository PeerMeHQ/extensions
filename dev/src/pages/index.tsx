import { Setup } from '@/setup'
import { useState } from 'react'
import { toDemoTransaction } from '@/helpers'
import { BaseLayout } from '@/layouts/BaseLayout'
import * as Extensions from '../../../src/extensions/index'
import { EntityTag, ProposalAction } from '@peerme/core-ts'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks'
import { sendTransactions } from '@multiversx/sdk-dapp/services'

export default function Home() {
  const [dark, setDark] = useState(false)
  const { address, account } = useGetAccountInfo()
  const [entityTag, setEntityTag] = useState('')
  const [selectedExtension, setSelectedExtension] = useState<Extensions.ExtensionInfo | null>(null)
  const [activeProposalAction, setActiveProposalAction] = useState<ProposalAction | null>(null)

  return (
    <BaseLayout onDarkModeChange={(val) => setDark(val)}>
      <h2 className="block rounded-xl lg:-ml-16 mb-2">App Selector 👇</h2>
      <p className="mb-2">Shown in the app gallery while creating a proposal.</p>
      <section className="mb-8 p-8 rounded-2xl bg-gray-50 dark:bg-gray-900">
        <Extensions.AppSelector
          config={Setup(dark).Config}
          onActionAddRequest={(action) => {
            setActiveProposalAction(action)
            if (address) {
              const result = window.confirm('Do you want to simulate the action as if it was executed by the DAO?')
              if (result) {
                sendTransactions({ transactions: [toDemoTransaction(action, account)] })
              }
            }
          }}
          onNotificationRequest={(text, type) => alert(`${type} -> ${text}`)}
          onAppSelected={(val) => setSelectedExtension(val)}
        />
      </section>
      <h2 className="block rounded-xl lg:-ml-16 mb-2">Extension Action Preview 👇</h2>
      <p className="mb-2">Shown on the proposal page for actions concerning your app.</p>
      <section className="mb-8 p-8 rounded-2xl dark:bg-gray-900 bg-gray-50">
        {selectedExtension && activeProposalAction ? (
          <Extensions.ActionPreview
            config={Setup(dark).Config}
            extension={selectedExtension}
            action={activeProposalAction}
          />
        ) : (
          <span className="text-lg text-yellow-500">
            Please select an app in the selector above and simulate the creation of a proposal action to show a preview.
          </span>
        )}
      </section>
      <h2 className="block rounded-xl lg:-ml-16 mb-2">
        Widget - Info 👇 <span className="text-2xl">[Active Tag: {entityTag || 'None'}]</span>
      </h2>
      <p className="mb-2">Shown on the DAO Info page if DAO is tagged with same tag as widget.</p>
      <section className="mb-8 p-8 rounded-2xl dark:bg-gray-900 bg-gray-50">
        <Extensions.WidgetInfoPresenter
          config={{
            ...Setup(dark).Config,
            entity: {
              ...Setup(dark).Config.entity,
              tags: [entityTag as EntityTag],
            },
          }}
        />
      </section>
    </BaseLayout>
  )
}
