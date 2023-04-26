import { BigNumber } from 'bignumber.js'

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
