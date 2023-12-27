import { Setup } from '@/setup'
import { useMemo, useState } from 'react'
import { toDemoTransaction } from '@/helpers'
import * as Extensions from '../../../src/index'
import { BaseLayout } from '@/layouts/BaseLayout'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks'
import { sendTransactions } from '@multiversx/sdk-dapp/services'
import { EntityTag, ProposalAction, UserPrivate } from '@peerme/core-ts'

export default function Home() {
  const [dark, setDark] = useState(false)
  const { address, account } = useGetAccountInfo()
  const [entityTag, setEntityTag] = useState<EntityTag | null>(null)
  const [selectedExtension, setSelectedExtension] = useState<Extensions.ExtensionInfo | null>(null)
  const [activeProposalAction, setActiveProposalAction] = useState<ProposalAction | null>(null)

  const user = useMemo(
    () =>
      ({
        address,
        username: null,
        name: 'Alice',
        email: null,
        hasVerifiedEmail: false,
        hasProfileImage: false,
        profileImageUrl: '',
        connections: {} as any,
        power: 0,
        country: null,
        timezone: null,
        justCreated: false,
        boosterUntil: null,
        experience: {
          level: 0,
          levelUpperLimit: '100',
          levelProgressPercent: 0,
        },
      } as UserPrivate),
    [address]
  )

  return (
    <BaseLayout onDarkModeChange={(val) => setDark(val)} onEntityTagChange={(val) => setEntityTag(val)}>
      <div className="mb-8">
        <h2 className="block rounded-xl lg:-ml-16 mb-2">App Selector 👇</h2>
        <p className="mb-2">Shown in the app gallery while creating a proposal.</p>
        <section className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900">
          <Extensions.AppSelector
            config={{
              user,
              ...Setup(dark, address).Config,
            }}
            onActionAddRequest={(action) => {
              setActiveProposalAction(action)
              if (address) {
                const result = window.confirm('Do you want to simulate the action as if it was executed by the DAO?')
                if (result) {
                  sendTransactions({ transactions: [toDemoTransaction(action, account)] })
                }
              } else {
                alert('Action added. Connect your wallet to simulate the transaction.')
              }
            }}
            onUserActionRequest={(tx) => {
              const result = window.confirm('Do you want to execute the transaction requested by the app?')
              if (result) {
                sendTransactions({ transactions: [tx] })
              }
            }}
            onNotificationRequest={(text, type) => alert(`${type} -> ${text}`)}
            onAppSelected={(val) => setSelectedExtension(val)}
          />
        </section>
      </div>
      <div className="mb-8">
        <h2 className="block rounded-xl lg:-ml-16 mb-2">Extension Action Preview 👇</h2>
        <p className="mb-2">Shown on the proposal page for actions concerning your app.</p>
        <section className="p-8 rounded-2xl dark:bg-gray-900 bg-gray-50">
          {selectedExtension && activeProposalAction ? (
            <Extensions.ActionPreview
              config={Setup(dark, address).Config}
              extension={selectedExtension}
              action={activeProposalAction}
            />
          ) : (
            <span className="text-lg text-yellow-500">
              Please select an app in the selector above and simulate the creation of a proposal action to show a
              preview.
            </span>
          )}
        </section>
      </div>
      <div className="mb-8">
        <h2 className="block rounded-xl lg:-ml-16 mb-2">
          Widget - Dashboard 👇 <span className="text-2xl">[Active Tag: {entityTag || 'None'}]</span>
        </h2>
        <p className="mb-2">Shown on the top of the Dashboard page if DAO is tagged with same tag as widget.</p>
        <section className="p-8 rounded-2xl dark:bg-gray-900 bg-gray-50">
          <Extensions.WidgetDashboardPresenter
            config={{
              ...Setup(dark, address).Config,
              entity: {
                ...Setup(dark, address).Config.entity,
                tags: [entityTag as EntityTag],
              },
            }}
          />
        </section>
      </div>
      <div className="mb-8">
        <h2 className="block rounded-xl lg:-ml-16 mb-2">
          Widget - Info 👇 <span className="text-2xl">[Active Tag: {entityTag || 'None'}]</span>
        </h2>
        <p className="mb-2">Shown on the DAO Info page if DAO is tagged with same tag as widget.</p>
        <section className="p-8 rounded-2xl dark:bg-gray-900 bg-gray-50">
          <Extensions.WidgetInfoPresenter
            config={{
              ...Setup(dark, address).Config,
              entity: {
                ...Setup(dark, address).Config.entity,
                tags: [entityTag as EntityTag],
              },
            }}
          />
        </section>
      </div>
    </BaseLayout>
  )
}
