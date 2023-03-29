import { BigNumber } from 'bignumber.js'

export type ClaimInfo = {
  amount: BigNumber
  lastModified: number
}

export type MarketRequirements = {
  acceptedTokens: string[]
  acceptedPayments: string[]
  maximumPaymentFees: BigNumber[]
  discountFeePercentageBuyer: BigNumber
  discountFeePercentageSeller: BigNumber
  percentageCutFromBuyer: BigNumber
  percentageCutFromSeller: BigNumber
  buyerFee: number
  sellerFee: number
}

export type OfferInfo = {
  index: number
  owner: string
  offeredTokenIdentifier: string
  offeredTokenNonce: number
  offeredTokenAmount: BigNumber
  wantedTokenIdentifier: string
  wantedTokenNonce: number
  wantedTokenAmount: BigNumber
  quantity: number
}

export type DataNftMetadata = {
  index: number
  id: string
  nftImgUrl?: string
  dataPreview: string
  dataStream: string
  dataMarshal: string
  tokenName: string
  creator: string
  creationTime: Date
  supply: number
  balance: number
  description: string
  title: string
  royalties: number
  nonce: number
  collection: string
}
