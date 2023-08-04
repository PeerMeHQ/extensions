import Link from 'next/link'
import { Config } from '../config'
import { fetchDataNfts } from '../api'
import { _Procurer } from './_Procurer'
import { decodeNftMetadata } from '../helpers'
import React, { useEffect, useState } from 'react'
import { DataNftMetadata, OfferInfo } from '../types'
import { useApp } from '../../../../shared/hooks/useApp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'

type Props = {
  offer: OfferInfo
}

export function _OfferProcureDetails(props: Props) {
  const app = useApp()
  const [nft, setNft] = useState<DataNftMetadata | null>(null)

  useEffect(() => {
    fetchDataNfts(app, props.offer.offeredTokenIdentifier, props.offer.offeredTokenNonce).then(async (val) => {
      const nftMintAbiRes = await fetch(Config.Abis.DataNft)
      const nftMintAbiContent = await nftMintAbiRes.json()
      setNft(decodeNftMetadata(nftMintAbiContent, val))
    })
  }, [props.offer])

  if (!nft) return null

  return (
    <div className="flex flex-col sm:flex-row sm:gap-8 py-4">
      {!!nft.nftImgUrl && <img src={nft.nftImgUrl} alt="NFT Preview" className="w-40 h-40 sm:w-64 sm:h-64" />}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl">{nft?.title}</h2>
        <Link
          href={app.config.walletConfig.Explorer + '/nfts/' + nft.id}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:text-blue-400"
        >
          {nft.id + ' '}
          <FontAwesomeIcon icon={faExternalLink} />
        </Link>
        <ul className="list-none text-gray-700 dark:text-gray-300 text-lg">
          <li>
            Listed: <strong>{props.offer.quantity}</strong>
          </li>
          <li>
            Total supply: <strong>{nft.supply.toFixed()}</strong>
          </li>
        </ul>
        <_Procurer offer={props.offer} nft={nft} />
      </div>
    </div>
  )
}
