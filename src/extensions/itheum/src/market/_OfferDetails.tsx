import Link from 'next/link'
import { Config } from '../config'
import { Button } from '@peerme/web-ui'
import { BigNumber } from 'bignumber.js'
import { Contracts } from '../contracts'
import { Constants } from '@peerme/core-ts'
import { decodeNftMetadata } from '../helpers'
import React, { useEffect, useState } from 'react'
import { TokenPayment } from '@multiversx/sdk-core'
import { DataNftMetadata, OfferInfo } from '../types'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppContextValue } from '../../../../shared/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import { NonFungibleTokenOfAccountOnNetwork } from '@multiversx/sdk-network-providers'

type Props = {
  offer: OfferInfo
}

export const _OfferDetails = (props: Props) => {
  const app = useApp()
  const [nft, setNft] = useState<NonFungibleTokenOfAccountOnNetwork | null>(null)
  const [nftMetadata, setNftMetadata] = useState<DataNftMetadata | null>(null)
  const [quantity] = useState(1)

  useEffect(() => {
    app.networkProvider
      .getNonFungibleToken(props.offer.offeredTokenIdentifier, props.offer.offeredTokenNonce)
      .then((val) => {
        setNft(val)
        setNftMetadata(decodeNftMetadata(val))
      })
  }, [])

  const handleProcure = () => {
    if (+quantity > +props.offer.quantity || +quantity <= 0) {
      app.showToast('Invalid quantity', 'error')
      return
    }
    const contract = Contracts(app.config).AcceptOffer
    const wantedAmount = props.offer.wantedTokenAmount.multipliedBy(quantity)
    const wantsEgld = props.offer.wantedTokenIdentifier == Constants.EgldTokenIdentifier
    const value = wantsEgld ? wantedAmount : 0
    const tokenPayments =
      wantsEgld || wantedAmount.isZero() ? [] : [toWantedTokenPayment(app, props.offer, wantedAmount)]

    app.requestProposalAction(contract.Address, contract.Endpoint, value, [props.offer.index, +quantity], tokenPayments)
  }

  if (!nft || !nftMetadata) return null

  return (
    <div className="flex flex-col sm:flex-row sm:gap-8 py-4">
      <img src={nftMetadata.nftImgUrl} alt="NFT Preview" className="w-40 h-40 sm:w-64 sm:h-64" />
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl">{nftMetadata?.title}</h2>
        <Link
          href={app.config.walletConfig.Explorer + '/nfts/' + nft.identifier}
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

const toWantedTokenPayment = (app: AppContextValue, offer: OfferInfo, amount: BigNumber.Value) =>
  new TokenPayment(offer.wantedTokenIdentifier, offer.wantedTokenNonce, amount, getWantedTokenDecimals(app, offer))

const getWantedTokenDecimals = (app: AppContextValue, offer: OfferInfo) => {
  if (offer.wantedTokenIdentifier == Constants.EgldTokenIdentifier) return Constants.EgldDecimals
  if (offer.wantedTokenIdentifier == Config.TokenId(app.config.network)) return Config.TokenDecimals
  return 0
}
