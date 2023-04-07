import React from 'react'
import { AddressPresenter } from '@peerme/web-ui'
import { TokenPayment } from '@multiversx/sdk-core'
import { createTokenPaymentFromBigInteger } from '../helpers'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'

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
  const singleAmount = createTokenPaymentFromBigInteger(
    totalPayment,
    totalPayment.amountAsBigInteger.div(nTransactions)
  )

  return (
    <>
      <ActionPreviewHighlight>
        send a total of <strong>{toFormattedTokenPayment(totalPayment)}</strong> to <strong>{nTransactions}</strong>{' '}
        addresses.
      </ActionPreviewHighlight>
      <section className="mt-4">
        <h4 className="mb-2">Send {toFormattedTokenPayment(singleAmount)} each to:</h4>
        <ul className="flex flex-wrap gap-2 mb-4">
          {args.map((arg, i) => (
            <li key={i}>
              <AddressPresenter value={arg?.toString() || ''} trim={4} className="mb-0" inline />
              {' , '}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
