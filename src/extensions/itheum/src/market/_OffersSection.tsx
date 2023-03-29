import React from 'react'
import { Switch } from '@peerme/web-ui'
import { Contracts } from '../contracts'
import { useEffect, useState } from 'react'
import { fetchDataNftsByIds } from '../api'
import { useScQuery } from '@peerme/core-ts'
import { _OfferPreview } from './_OfferPreview'
import { DataNftMetadata, OfferInfo } from '../types'
import { toNftId, toTypedOfferInfo } from '../helpers'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'

export const _OffersSection = () => {
  const app = useApp()
  const [nfts, setNfts] = useState<DataNftMetadata[]>([])
  const [offers, setOffers] = useState<OfferInfo[]>([])
  const [showOurs, setShowOurs] = useState(false)
  const pagedOffersScQuery = useScQuery(app.config.walletConfig, Contracts(app.config).ViewPagedOffers)

  useEffect(() => {
    const args = showOurs ? [0, 10, app.config.entity.address] : [0, 10]
    pagedOffersScQuery.query(args).then(async (bundle) => {
      const offers: OfferInfo[] = bundle.firstValue?.valueOf()?.map(toTypedOfferInfo) || []
      setOffers(offers)
      const nftIds = offers.map((o) => toNftId(o.offeredTokenIdentifier, o.offeredTokenNonce))
      const nfts = await fetchDataNftsByIds(app, nftIds)
      setNfts(nfts)
    })
  }, [showOurs])

  return (
    <AppSection title="Marketplace Offers">
      <header className="flex justify-end">
        <div className="flex items-center space-x-4 mb-4">
          <Switch label="Show listed by DAO" checked={showOurs} onChange={(val) => setShowOurs(val)} />
          <span className="text-xl text-gray-700 dark:text-gray-200">Show Listed by {app.config.entity.name}</span>
        </div>
      </header>
      <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {offers.map((offer) => (
          <li key={offer.index}>
            <_OfferPreview offer={offer} nft={findNftByOffer(offer, nfts)} />
          </li>
        ))}
      </ul>
    </AppSection>
  )
}

export const findNftByOffer = (offer: OfferInfo, nfts: DataNftMetadata[]) =>
  nfts.find((nft) => nft.collection === offer.offeredTokenIdentifier && nft.nonce === offer.offeredTokenNonce) || null
