import React from 'react'
import { TokenPayment } from '@multiversx/sdk-core'
import { AddressPresenter } from '@peerme/web-ui'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'
import { createTokenPayment } from './../Helpers'

type Props = {
  action: ProposalAction
}

export const BulkSendSameAmountActionPreview = (props: Props) => {
  //get all the arguments (addresses of the receivers)
  const args = props.action.arguments
  const nTransactions = args.length

  //get the transaction payment
  const totalPayment =
    props.action.payments.length > 0
      ? toTokenPaymentFromProposalPayment(props.action.payments[0])
      : TokenPayment.egldFromBigInteger(props.action.value)

  //calculate the amount to send to each address
  const singleAmount = createTokenPayment(totalPayment, totalPayment.amountAsBigInteger.div(nTransactions))

  return (
    <>
      send a total of <strong>{toFormattedTokenPayment(totalPayment)}</strong> to <strong>{nTransactions}</strong>{' '}
      addresses.
      <br />
      Send {toFormattedTokenPayment(singleAmount)} each to:
      <br />
      <br />
      {args.map((arg, i) => {
        return <AddressPresenter key={i} value={arg?.toString() || ''} trim={5} />
      })}
    </>
  )
}
