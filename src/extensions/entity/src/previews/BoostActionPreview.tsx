import React from 'react'
import { TokenTransfer } from '@multiversx/sdk-core'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import {
  EntityConfig,
  ProposalAction,
  toFormattedTokenPayment,
  toTokenPaymentFromProposalPayment,
} from '@peerme/core-ts'

type Props = {
  action: ProposalAction
}

export function BoostActionPreview(props: Props) {
  const displayablePayments =
    props.action.payments.length > 0
      ? props.action.payments
          .map((payment) => toFormattedTokenPayment(toTokenPaymentFromProposalPayment(payment)))
          .join(', ')
      : toFormattedTokenPayment(TokenTransfer.egldFromBigInteger(props.action.value))

  return (
    <ActionPreviewHighlight>
      boost our {EntityConfig.ProductName} with <strong>{displayablePayments}</strong>.
    </ActionPreviewHighlight>
  )
}
