import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'
import { WarpArgSerializer } from '@vleap/warps'
import Link from 'next/link'
import pluralize from 'pluralize'
import React from 'react'
import { ExtensionConfig } from '../../../../shared/types'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { Config } from '../config'

type Props = {
  action: ProposalAction
  config: ExtensionConfig
}

export function AcceptOfferActionPreview(props: Props) {
  const was = new WarpArgSerializer()
  const offerId = was.stringToNative(props.action.arguments[0])[1] as number
  const quantity = was.stringToNative(props.action.arguments[1])[1] as number
  const offerUrl = Config.Urls.MarketplaceOffer(props.config.network.env, offerId)

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
