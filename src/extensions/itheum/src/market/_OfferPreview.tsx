import React from 'react'
import { DataNftMetadata, OfferInfo } from '../types'
import { _MarketListSection } from '../wallet/_MarketListSection'

type Props = {
  offer: OfferInfo
  nft: DataNftMetadata | null
}

export const _OfferPreview = (props: Props) => {
  if (!props.nft) return null

  return (
    <button className="block p-4 bg-gray-200 dark:bg-gray-900 rounded-xl">
      <div className="mb-4">
        {props.nft.nftImgUrl && (
          <img src={props.nft.nftImgUrl} alt="NFT Preview" className="w-32 h-32 sm:w-40 sm:h-40" />
        )}
      </div>
      <h3 className="text-lg">{props.nft.title}</h3>
    </button>
  )
}
