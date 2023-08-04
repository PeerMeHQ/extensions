import React, { useState } from 'react'
import { toDateDisplay } from '@peerme/core-ts'
import { _MarketListSection } from './_MarketListSection'
import { AddressPresenter, StickyModal } from '@peerme/web-ui'
import { DataNftMetadata, MarketRequirements } from '../types'

type Props = {
  nft: DataNftMetadata
  marketRequirements: MarketRequirements | null
}

export function _DataNftPreview(props: Props) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <button onClick={() => setShowDetails(true)} className="block p-4 bg-gray-200 dark:bg-gray-900 rounded-xl">
        <div className="mb-4">
          {props.nft.nftImgUrl && (
            <img src={props.nft.nftImgUrl} alt="NFT Preview" className="w-32 h-32 sm:w-40 sm:h-40" />
          )}
        </div>
        <h3 className="text-lg">{props.nft.title}</h3>
      </button>
      <StickyModal open={showDetails} onClose={() => setShowDetails(false)}>
        <header className="flex gap-8 mb-4 p-4">
          <div className="flex-shrink-0 flex items-center">
            <img src={props.nft.nftImgUrl} alt="NFT Preview" className="w-32 h-32 sm:w-40 sm:h-40" />
          </div>
          <div className="flex-grow">
            <h3 className="text-xl sm:text-2xl">{props.nft.title}</h3>
            <p className="mb-2">{props.nft.description}</p>
            <ul className="text-gray-800 dark:text-gray-100 text-base">
              <li>
                Creator: <AddressPresenter value={props.nft.creator} trim={4} className="inline-flex" />
              </li>
              <li>
                Created At: <strong>{toDateDisplay(props.nft.creationTime.toString())}</strong>
              </li>
              <li>
                Balance: <strong>{props.nft.balance}</strong>
              </li>
              <li>
                Total Supply: <strong>{props.nft.supply}</strong>
              </li>
              <li>
                Royalty: <strong>{toDisplayablePercentage(props.nft.royalties)}</strong>
              </li>
            </ul>
          </div>
        </header>
        <_MarketListSection nft={props.nft} marketRequirements={props.marketRequirements} />
      </StickyModal>
    </>
  )
}

const toDisplayablePercentage = (value: number) => parseFloat((value * 100).toFixed(2)) + '%'
