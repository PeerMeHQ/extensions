import { getContractAddress } from './config'
import { AppHook } from '../../../hooks/useApp'
import { TokenPayment } from '@elrondnetwork/erdjs'
import React, { SyntheticEvent, useState } from 'react'
import { Input, Button, showToast, UserSelector, PaymentSelector } from '@peerme/web-ui'

type Props = {
  app: AppHook
}

const ContractEndpoint = 'createStream'

export const _StreamCreator = (props: Props) => {
  const [recipient, setRecipient] = useState('')
  const [payment, setPayment] = useState<TokenPayment | null>(null)
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!payment) {
      showToast('Please add a payment', 'error')
      return
    }
    const startsAtTs = Math.floor(new Date(startsAt).getTime() / 1000)
    const endsAtTs = Math.floor(new Date(endsAt).getTime() / 1000)
    const value = payment.isEgld() ? payment.amountAsBigInteger : 0
    const tokenPayments = payment.isEgld() ? [] : [payment]

    props.app.requestProposalAction(
      getContractAddress(props.app.config.network),
      ContractEndpoint,
      value,
      [recipient, startsAtTs, endsAtTs],
      tokenPayments
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="recipient" className="sr-only">
        Recipient
      </label>
      <UserSelector
        id="recipient"
        placeholder="Recipient address ..."
        onSelect={(val) => setRecipient(val.address)}
        className="mb-8"
      />
      <PaymentSelector
        entity={props.app.config.entity}
        permissions={[]}
        onSelected={(val) => setPayment(val)}
        className="mb-8"
      />
      <label htmlFor="starting_date" className="pl-1 text-xl mb-2 text-gray-800 dark:text-gray-200">
        Starts at (your local time)
      </label>
      <Input
        id="starting_date"
        type="datetime-local"
        placeholder="Starts at ..."
        value={startsAt}
        onChange={(val) => setStartsAt(val)}
        className="mb-4"
        required
      />
      <label htmlFor="ending_date" className="pl-1 text-xl mb-2 text-gray-800 dark:text-gray-200">
        Ends at (your local time)
      </label>
      <Input
        id="ending_date"
        type="datetime-local"
        placeholder="Ends at ..."
        value={endsAt}
        onChange={(val) => setEndsAt(val)}
        className="mb-8"
        required
      />
      <Button color="blue" className="block w-full" submit>
        Create Stream
      </Button>
    </form>
  )
}
