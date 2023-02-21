import React from 'react'
import { AddressPresenter } from '@peerme/web-ui'
import { TokenPayment } from '@elrondnetwork/erdjs'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'

type Props = {
  action: ProposalAction
}

export const StreamCreateActionPreview = (props: Props) => {
  const receiver = props.action.arguments[0]
  const displayableStart = new Date(parseInt(props.action.arguments[1]?.toString() || '0') * 1000).toLocaleString()
  const displayableEnd = new Date(parseInt(props.action.arguments[2]?.toString() || '0') * 1000).toLocaleString()
  const displayableCancel = !!props.action.arguments[3] ? 'cancellable' : ''
  const displayablePayments =
    props.action.payments.length > 0
      ? props.action.payments
          .map((payment) => toFormattedTokenPayment(toTokenPaymentFromProposalPayment(payment)))
          .join(', ')
      : toFormattedTokenPayment(TokenPayment.egldFromBigInteger(props.action.value))

  return (
    <>
      create a <strong>{displayableCancel}</strong> token stream of <strong>{displayablePayments}</strong> to{' '}
      <AddressPresenter value={receiver?.toString() || ''} trim={8} inline /> starting at {displayableStart} until{' '}
      {displayableEnd}.
    </>
  )
}
