import { CoindripContracts } from './contracts'
import { TokenTransfer } from '@multiversx/sdk-core'
import { useApp } from '../../../shared/hooks/useApp'
import React, { SyntheticEvent, useState } from 'react'
import { Input, Button, UserSelector, EntityTransferSelector, Switch } from '@peerme/web-ui'

export const _StreamCreator = () => {
  const app = useApp()
  const [recipient, setRecipient] = useState('')
  const [payment, setPayment] = useState<TokenTransfer | null>(null)
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')
  const [cancellable, setCancellable] = useState(true)
  const isSubmitDisabled = !recipient || !payment || !startsAt || !endsAt

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!payment) return
    const nowTs = Math.floor(Date.now() / 1000)
    const startsAtTs = Math.floor(new Date(startsAt).getTime() / 1000)
    const endsAtTs = Math.floor(new Date(endsAt).getTime() / 1000)
    const value = payment.isEgld() ? payment.amountAsBigInteger : 0
    const tokenTransfers = payment.isEgld() ? [] : [payment]

    if (startsAtTs < nowTs) {
      app.showToast('Start date must be set to the future', 'error')
      return
    }

    if (endsAtTs < startsAtTs) {
      app.showToast('Start date must be before end date', 'error')
      return
    }

    app.requestProposalAction(
      CoindripContracts(app.config).StreamCreate.Address,
      CoindripContracts(app.config).StreamCreate.Endpoint,
      value,
      [recipient, startsAtTs, endsAtTs, cancellable],
      tokenTransfers
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="recipient" className="sr-only">
        Recipient
      </label>
      <UserSelector
        searchConfig={app.config.searchConfig}
        id="recipient"
        placeholder="Recipient address ..."
        onSelect={(val) => setRecipient(val.address)}
        className="mb-8"
      />
      <EntityTransferSelector
        config={app.config.walletConfig}
        entity={app.config.entity}
        permissions={[]}
        onSelected={(val) => setPayment(val)}
        className="mb-8"
      />
      <div className="mb-4">
        <label htmlFor="starting_date" className="pl-1 text-xl mb-2 text-gray-800 dark:text-gray-200">
          Starts at (your local time)
        </label>
        <Input
          id="starting_date"
          type="datetime-local"
          placeholder="Starts at ..."
          value={startsAt}
          onChange={(val) => setStartsAt(val)}
          required
        />
        <small className="block mt-2 pl-2 text-yellow-500 text-sm">
          The proposal must be executed before the start date or it will fail.
        </small>
      </div>
      <div className="mb-4">
        <label htmlFor="ending_date" className="pl-1 text-xl mb-2 text-gray-800 dark:text-gray-200">
          Ends at (your local time)
        </label>
        <Input
          id="ending_date"
          type="datetime-local"
          placeholder="Ends at ..."
          value={endsAt}
          onChange={(val) => setEndsAt(val)}
          required
        />
      </div>
      <div className="flex items-center space-x-4 py-4 mb-4">
        <Switch label="Cancellable" checked={cancellable} onChange={(val) => setCancellable(val)} />
        <span className="text-xl text-gray-700 dark:text-gray-200">Can cancel?</span>
      </div>
      <Button color="blue" className="block w-full" disabled={isSubmitDisabled} submit>
        Create Stream
      </Button>
    </form>
  )
}
