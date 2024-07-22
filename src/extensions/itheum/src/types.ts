export type MarketRequirements = {
  acceptedTokens: string[]
  acceptedPayments: string[]
  maximumPaymentFees: bigint[]
  discountFeePercentageBuyer: number
  discountFeePercentageSeller: number
  percentageCutFromBuyer: number
  percentageCutFromSeller: number
  buyerFee: number
  sellerFee: number
}

export type ClaimInfo = {
  amount: bigint
  lastModified: number
}

export type OfferInfo = {
  id: number
  owner: string
  offeredTokenIdentifier: string
  offeredTokenNonce: number
  offeredTokenAmount: bigint
  wantedTokenIdentifier: string
  wantedTokenNonce: number
  wantedTokenAmount: bigint
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
  boardStakeAmount: bigint
  boardStakeDurationSeconds: number
  stakeLockTimeSeconds: number
  userStake: bigint
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
