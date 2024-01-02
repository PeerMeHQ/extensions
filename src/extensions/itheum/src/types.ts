import { BigNumber } from 'bignumber.js'

export type MarketRequirements = {
  acceptedTokens: string[]
  acceptedPayments: string[]
  maximumPaymentFees: BigNumber[]
  discountFeePercentageBuyer: number
  discountFeePercentageSeller: number
  percentageCutFromBuyer: number
  percentageCutFromSeller: number
  buyerFee: number
  sellerFee: number
}

export type ClaimInfo = {
  amount: BigNumber
  lastModified: number
}

export type OfferInfo = {
  id: number
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

export type CoalitionInfo = {
  nativeToken: string
  aggregator: string
  aggregatorApp: number
  categories: string[]
  delegators: number
  boardStakeAmount: BigNumber
  boardStakeDurationSeconds: number
  stakeLockTimeSeconds: number
  userStake: BigNumber
  userStakeUnlocksAt: number
}

export type AggregatorAppInfo = {
  name: string
  manager: string
  createdAt: number
  dataCollections: string[]
}

export type AggregatorDelegation = {
  collection: string
  nonce: number
  segment: string
  metadata: DataNftMetadata | null
}
