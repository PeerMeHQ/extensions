import React from 'react'
import Link from 'next/link'
import { Config } from '../config'
import { DataNftMetadata, OfferInfo } from '../types'
import { useApp } from '../../../../shared/hooks/useApp'
import { _MarketListSection } from '../wallet/_MarketListSection'

type Props = {
  offer: OfferInfo
  nft: DataNftMetadata | null
}

export const _OfferPreview = (props: Props) => {
  if (!props.nft) return null
  const app = useApp()

  return (
    <Link
      href={Config.Urls.MarketplaceOffer(app.config.network, props.offer.index)}
      target="_blank"
      rel="noopener"
      className="block p-4 bg-gray-200 dark:bg-gray-900 rounded-xl"
    >
      <div className="mb-4">
        {props.nft.nftImgUrl && (
          <img src={props.nft.nftImgUrl} alt="NFT Preview" className="w-32 h-32 sm:w-40 sm:h-40" />
        )}
      </div>
      <h3 className="text-base">{props.nft.title}</h3>
    </Link>
  )
}
