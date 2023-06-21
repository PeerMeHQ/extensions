import React from 'react'
import { TokenTransfer } from '@multiversx/sdk-core'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'

type Props = {
  action: ProposalAction
}

export const AddOfferActionPreview = (props: Props) => {
  const paymentToken = props.action.arguments[0] as string
  const paymentFee = props.action.arguments[2] as string

  const displayableOfferPayments =
    props.action.payments.length > 0
      ? props.action.payments
          .map((payment) => toFormattedTokenPayment(toTokenPaymentFromProposalPayment(payment)))
          .join(', ')
      : toFormattedTokenPayment(TokenTransfer.egldFromBigInteger(props.action.value))

  return (
    <ActionPreviewHighlight>
      list <strong>{displayableOfferPayments}</strong> on marketplace for {paymentToken} with Fee {paymentFee}.
    </ActionPreviewHighlight>
  )
}
