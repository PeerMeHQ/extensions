import React from 'react'
import { Config } from '../config'
import { TokenTransfer } from '@multiversx/sdk-core'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import {
  ProposalAction,
  toFormattedTokenAmount,
  toFormattedTokenPayment,
  toTokenPaymentFromProposalPayment,
} from '@peerme/core-ts'

type Props = {
  action: ProposalAction
}

export function AddOfferActionPreview(props: Props) {
  const paymentToken = props.action.arguments[0] as string
  const price = props.action.arguments[2] as string

  const displayableOfferPayments =
    props.action.payments.length > 0
      ? props.action.payments
          .map((payment) => toFormattedTokenPayment(toTokenPaymentFromProposalPayment(payment)))
          .join(', ')
      : toFormattedTokenPayment(TokenTransfer.egldFromBigInteger(props.action.value))

  const displayablePrice = toFormattedTokenAmount(price, Config.TokenDecimals)

  return (
    <ActionPreviewHighlight>
      list <strong>{displayableOfferPayments}</strong> on marketplace for <strong>{displayablePrice}</strong>{' '}
      {paymentToken} <strong>each</strong>.
    </ActionPreviewHighlight>
  )
}
