import { XBulkConfig } from './config'
import { TokenPayment } from '@multiversx/sdk-core'
import { useApp } from '../../../shared/hooks/useApp'
import React, { SyntheticEvent, useState } from 'react'
import { Button, showToast, PaymentSelector } from '@peerme/web-ui'

export const _Transactions = () => {
  const app = useApp()
  const [payment, setPayment] = useState<TokenPayment | null>(null)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!payment) {
      showToast('Please select a token', 'error')
      return
    }
    const value = payment.isEgld() ? payment.amountAsBigInteger : 0
    const tokenPayments = payment.isEgld() ? [] : [payment]

    app.requestProposalAction(
      XBulkConfig.ContractAddress(app.config.network),
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
        config={app.config.walletConfig}
        entity={app.config.entity}
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
