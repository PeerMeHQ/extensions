import BigNumber from 'bignumber.js'
import { numberToPaddedHex } from '@peerme/core-ts'
import { AbiRegistry, BinaryCodec } from '@multiversx/sdk-core'
import { NonFungibleTokenOfAccountOnNetwork } from '@multiversx/sdk-network-providers'
import {
  ClaimInfo,
  OfferInfo,
  CoalitionInfo,
  DataNftMetadata,
  AggregatorAppInfo,
  MarketRequirements,
  AggregatorDelegation,
} from './types'

export const toTypedMarketRequirements = (value: any): MarketRequirements => ({
  acceptedTokens: value.accepted_tokens.map((v: any) => v.toString()),
  acceptedPayments: value.accepted_payments.map((v: any) => v.toString()),
  maximumPaymentFees: value.maximum_payment_fees.map((v: any) => new BigNumber(v)),
  discountFeePercentageBuyer: value.discount_fee_percentage_buyer.toNumber(),
  discountFeePercentageSeller: value.discount_fee_percentage_seller.toNumber(),
  percentageCutFromBuyer: value.percentage_cut_from_buyer.toNumber(),
  percentageCutFromSeller: value.percentage_cut_from_seller.toNumber(),
  buyerFee: value.percentage_cut_from_buyer.toNumber() - value.discount_fee_percentage_buyer.toNumber(),
  sellerFee: value.percentage_cut_from_seller.toNumber() - value.discount_fee_percentage_seller.toNumber(),
})

export const toTypedClaimInfo = (value: any): ClaimInfo =>
  ({
    amount: new BigNumber(value.amount),
    lastModified: value.date.toNumber() * 1000,
  } as ClaimInfo)

export const toTypedCoalitionInfo = (value: any): CoalitionInfo => ({
  nativeToken: value.native_token.toString(),
  aggregator: value.aggregator.toString(),
  aggregatorApp: value.aggregator_app.toString(),
  categories: value.categories.map((v: any) => v.toString()),
  delegators: value.delegators.toNumber(),
  boardStakeAmount: value.board_stake_amount,
  boardStakeDurationSeconds: value.board_stake_duration.toNumber(),
  stakeLockTimeSeconds: value.stake_lock_time.toNumber(),
  userStake: value.user_stake,
  userStakeUnlocksAt: value.user_stake_unlocks_at.toNumber(),
})

export const toTypedAggregatorAppInfo = (value: any): AggregatorAppInfo => ({
  name: value.name.toString(),
  manager: value.manager.toString(),
  createdAt: value.created_at.toNumber(),
  dataCollections: value.data_collections.map((v: any) => v.toString()),
})

export const toTypedAggregatorDelegation = (value: any): AggregatorDelegation => ({
  collection: value.collection.toString(),
  nonce: value.nonce.toNumber(),
  segment: value.segment.toString(),
})

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

export const decodeNftMetadata = (
  nftMintAbiContent: string,
  nft: NonFungibleTokenOfAccountOnNetwork,
  index?: number
): DataNftMetadata => {
  const abiRegistry = AbiRegistry.create(nftMintAbiContent as any)
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
    balance: nft.balance.toNumber(),
  }
}

export const toNftId = (collectionId: string, nonce: number) => `${collectionId}-${numberToPaddedHex(nonce)}`
