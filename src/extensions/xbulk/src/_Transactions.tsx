import { XBulkConfig } from './config'
import { AppHook } from '../../_shared/hooks/useApp'
import { TokenPayment } from '@multiversx/sdk-core'
import React, { SyntheticEvent, useState } from 'react'
import { Button, showToast, PaymentSelector } from '@peerme/web-ui'

type Props = {
  app: AppHook
}

export const _Transactions = (props: Props) => {
  const [payment, setPayment] = useState<TokenPayment | null>(null)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!payment) {
      showToast('Please select a token', 'error')
      return
    }
    const value = payment.isEgld() ? payment.amountAsBigInteger : 0
    const tokenPayments = payment.isEgld() ? [] : [payment]

    props.app.requestProposalAction(
      XBulkConfig.ContractAddress(props.app.config.network),
      XBulkConfig.Endpoints.BulkSend,
      value,
      [],
      tokenPayments
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="recipient" className="sr-only">
        Which token do you want to send?
      </label>
      <PaymentSelector
        config={props.app.config.walletConfig}
        entity={props.app.config.entity}
        permissions={[]}
        onSelected={(val) => setPayment(val)}
        className="mb-8"
      />
      <Button color="blue" className="block w-full" submit>
        Add Payments
      </Button>
    </form>
  )
}
