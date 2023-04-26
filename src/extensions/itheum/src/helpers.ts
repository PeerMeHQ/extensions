import BigNumber from 'bignumber.js'
import { numberToPaddedHex } from '@peerme/core-ts'
import JsonAbiNftMint from '../meta/datanftmint.abi.json'
import { AbiRegistry, BinaryCodec } from '@multiversx/sdk-core'
import { ClaimInfo, DataNftMetadata, OfferInfo } from './types'
import { NonFungibleTokenOfAccountOnNetwork } from '@multiversx/sdk-network-providers'

export const toTypedClaimInfo = (value: any): ClaimInfo =>
  ({
    amount: new BigNumber(value.amount),
    lastModified: value.date.toNumber() * 1000,
  } as ClaimInfo)

export const isValidItheumMarketplaceUrl = (str: string) => {
  const pattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[\:?\d]*)\S*$/
  return pattern.test(str)
}

export const getOfferIdFromUrlOrNull = (url: string) => {
  const match = url.match(/offer-(\d+)/)
  return match ? parseInt(match[1]) : null
}

export const toTypedOfferInfo = (value: any): OfferInfo => ({
  id: value.offer_id.toNumber(),
  owner: value.owner.toString(),
  offeredTokenIdentifier: value.offered_token_identifier.toString(),
  offeredTokenNonce: value.offered_token_nonce.toNumber(),
  offeredTokenAmount: new BigNumber(value.offered_token_amount),
  wantedTokenIdentifier: value.wanted_token_identifier.toString(),
  wantedTokenNonce: value.wanted_token_nonce.toNumber(),
  wantedTokenAmount: new BigNumber(value.wanted_token_amount),
  quantity: value.quantity.toNumber(),
})

export const decodeNftMetadata = (nft: NonFungibleTokenOfAccountOnNetwork, index?: number): DataNftMetadata => {
  const abiRegistry = AbiRegistry.create(JsonAbiNftMint)
  const dataNftAttributes = abiRegistry.getStruct('DataNftAttributes')
  const decodedAttributes = new BinaryCodec().decodeTopLevel(nft.attributes, dataNftAttributes).valueOf()

  return {
    index: index || 0, // only for view & query
    id: nft.identifier, // ID of NFT -> done
    // TODO: clean the 'as any' once this PR is merged: https://github.com/multiversx/mx-sdk-js-network-providers/pull/38
    nftImgUrl: (nft as any)?.rawResponse?.url || undefined, // image URL of of NFT -> done
    dataPreview: decodedAttributes['data_preview_url'].toString(), // preview URL for NFT data stream -> done
    dataStream: decodedAttributes['data_stream_url'].toString(), // data stream URL -> done
    dataMarshal: decodedAttributes['data_marshal_url'].toString(), // data stream URL -> done
    tokenName: nft.name, // is this different to NFT ID? -> yes, name can be chosen by the user
    creator: decodedAttributes['creator'].toString(), // initial creator of NFT
    creationTime: new Date(Number(decodedAttributes['creation_time']) * 1000), // initial creation time of NFT
    supply: nft.supply ? Number(nft.supply) : 0,
    description: decodedAttributes['description'].toString(),
    title: decodedAttributes['title'].toString(),
    royalties: nft.royalties ? nft.royalties.toNumber() / 100 : 0,
    nonce: nft.nonce,
    collection: nft.collection,
    balance: 0,
  }
}

export const toNftId = (collectionId: string, nonce: number) => `${collectionId}-${numberToPaddedHex(nonce)}`
