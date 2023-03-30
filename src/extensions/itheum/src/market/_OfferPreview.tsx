import React from 'react'
import Link from 'next/link'
import { Config } from '../config'
import { DataNftMetadata, OfferInfo } from '../types'
import { useApp } from '../../../../shared/hooks/useApp'
import { _MarketListSection } from '../wallet/_MarketListSection'

type Props = {
  offer: OfferInfo
  nft: DataNftMetadata | null
  onProcureRequest?: () => void
}

export const _OfferPreview = (props: Props) => {
  if (!props.nft) return null
  const app = useApp()
  const linkUrl = Config.Urls.MarketplaceOffer(app.config.network, props.offer.index)

  return (
    <div className="block p-4 bg-gray-200 dark:bg-gray-900 rounded-xl">
      <div className="mb-4">
        {!!props.nft.nftImgUrl && (
          <Link href={linkUrl} target="_blank" rel="noopener">
            <img src={props.nft.nftImgUrl} alt="NFT Preview" className="w-32 h-32 sm:w-40 sm:h-40" />
          </Link>
        )}
      </div>
      <h3 className="text-base">{props.nft.title}</h3>
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={props.onProcureRequest}
          className="bg-blue-500 hover:bg-blue-400 text-blue-100 px-3 py-1 rounded-lg"
        >
          Procure
        </button>
        <Link href={linkUrl} target="_blank" rel="noopener" className="text-blue-500 hover:text-blue-400">
          View details
        </Link>
      </div>
    </div>
  )
}
