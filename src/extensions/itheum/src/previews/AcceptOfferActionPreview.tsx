import React from 'react'
import Link from 'next/link'
import pluralize from 'pluralize'
import { Config } from '../config'
import { ExtensionConfig } from '../../../../shared/types'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'

type Props = {
  action: ProposalAction
  config: ExtensionConfig
}

export function AcceptOfferActionPreview(props: Props) {
  const offerId = props.action.arguments[0] as number
  const quantity = props.action.arguments[1] as number
  const offerUrl = Config.Urls.MarketplaceOffer(props.config.env, offerId)

  const displayableCostPayments =
    props.action.payments.length > 0
      ? 'costing ' +
        props.action.payments
          .map((payment) => toFormattedTokenPayment(toTokenPaymentFromProposalPayment(payment)))
          .join(', ')
      : 'which is free'

  return (
    <ActionPreviewHighlight>
      procure {quantity} {pluralize('pieces', quantity)} of this{' '}
      <Link href={offerUrl} target="_blank" rel="noopener" className="text-blue-500 hover:text-blue-400">
        marketplace offer
      </Link>{' '}
      <strong>{displayableCostPayments}</strong>.
    </ActionPreviewHighlight>
  )
}
