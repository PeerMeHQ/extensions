import React from 'react'
import { AddressPresenter } from '@peerme/web-ui'
import { TokenTransfer } from '@multiversx/sdk-core'
import { useApp } from '../../../../shared/hooks/useApp'
import { createTokenTransferFromBigInteger } from '../helpers'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'

type Props = {
  action: ProposalAction
}

export const BulkSendSameAmountActionPreview = (props: Props) => {
  const app = useApp()
  //get all the arguments (addresses of the receivers)
  const args = props.action.arguments
  const nTransactions = args.length

  //get the transaction payment
  const totalTransfer =
    props.action.payments.length > 0
      ? toTokenPaymentFromProposalPayment(props.action.payments[0])
      : TokenTransfer.egldFromBigInteger(props.action.value.toString())

  //calculate the amount to send to each address
  const singleAmount = createTokenTransferFromBigInteger(totalTransfer, totalTransfer.amount / BigInt(nTransactions))

  return (
    <>
      <ActionPreviewHighlight>
        send a total of <strong>{toFormattedTokenPayment(totalTransfer)}</strong> to <strong>{nTransactions}</strong>{' '}
        addresses.
      </ActionPreviewHighlight>
      <section className="mt-4">
        <h4 className="mb-2">Send {toFormattedTokenPayment(singleAmount)} each to:</h4>
        <ul className="flex flex-wrap gap-2 mb-4">
          {args.map((arg, i) => (
            <li key={i}>
              <AddressPresenter
                network={app.config.network}
                value={arg?.toString() || ''}
                trim={4}
                className="mb-0"
                inline
              />
              {' , '}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
