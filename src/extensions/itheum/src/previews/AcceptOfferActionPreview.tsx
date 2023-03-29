import React from 'react'
import Link from 'next/link'
import { Config } from '../config'
import pluralize from 'pluralize'
import { ProposalAction } from '@peerme/core-ts'
import { ExtensionConfig } from '../../../../shared/types'

type Props = {
  action: ProposalAction
  config: ExtensionConfig
}

export const AcceptOfferActionPreview = (props: Props) => {
  const offerId = props.action.arguments[0] as number
  const quantity = props.action.arguments[1] as number
  const offerUrl = Config.Urls.MarketplaceOffer(props.config.network, offerId)

  return (
    <>
      procure {quantity} {pluralize('pieces', quantity)} of this{' '}
      <Link href={offerUrl} target="_blank" rel="noopener" className="text-blue-500 hover:text-blue-400">
        marketplace offer
      </Link>
      .
    </>
  )
}
