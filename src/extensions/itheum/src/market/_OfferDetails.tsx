import Link from 'next/link'
import { Button } from '@peerme/web-ui'
import { Contracts } from '../contracts'
import { decodeNftMetadata } from '../helpers'
import React, { useEffect, useState } from 'react'
import { DataNftMetadata, OfferInfo } from '../types'
import { AppHook } from '../../../../shared/hooks/useApp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import { NonFungibleTokenOfAccountOnNetwork } from '@multiversx/sdk-network-providers'

type Props = {
  app: AppHook
  offer: OfferInfo
}

export const _OfferDetails = (props: Props) => {
  const [nft, setNft] = useState<NonFungibleTokenOfAccountOnNetwork | null>(null)
  const [nftMetadata, setNftMetadata] = useState<DataNftMetadata | null>(null)
  const [quantity] = useState(1)

  useEffect(() => {
    props.app.networkProvider
      .getNonFungibleToken(props.offer.offeredTokenIdentifier, props.offer.offeredTokenNonce)
      .then((val) => {
        setNft(val)
        setNftMetadata(decodeNftMetadata(val))
      })
  }, [])

  const handleProcure = () => {
    if (+quantity > +props.offer.quantity || +quantity <= 0) {
      props.app.showToast('Invalid quantity', 'error')
      return
    }
    const contract = Contracts(props.app.config).AcceptOffer
    props.app.requestProposalAction(contract.Address, contract.Endpoint, 0, [props.offer.index, +quantity], [])
  }

  if (!nft || !nftMetadata) return null

  return (
    <div className="flex flex-col sm:flex-row sm:gap-8 py-4">
      <img src={nftMetadata.nftImgUrl} alt="NFT Preview" className="w-40 h-40 sm:w-64 sm:h-64" />
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl">{nftMetadata?.title}</h2>
        <Link
          href={props.app.config.walletConfig.Explorer + '/nfts/' + nft.identifier}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:text-blue-400"
        >
          {nft.identifier + ' '}
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
        <Button onClick={handleProcure} color="blue">
          Procure
        </Button>
      </div>
    </div>
  )
}
