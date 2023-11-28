import { BigNumber } from 'bignumber.js'

export type DelegationProvider = {
  numNodes: number
  stake: BigNumber
  topUp: string
  locked: string
  contract: string
  owner: string
  featured: boolean
  serviceFee: number
  delegationCap: BigNumber
  apr: number
  numUsers: number
  cumulatedRewards: string
  identity: string
  automaticActivation: boolean
  checkCapOnRedelegate: boolean
  githubProfileValidated: boolean
  githubProfileValidatedAt: string
  githubKeysValidated: boolean
  githubKeysValidatedAt: string
  identityInfo: ProviderIdentity
}

type ProviderIdentity = {
  identity: string
  locked: string
  distribution: { [key: string]: number }
  avatar: string
  description: string
  name: string
  website: string
  twitter: string
  location: string
  score: number
  validators: number
  stake: string
  topUp: string
  providers: string[]
  stakePercent: number
  apr: number
  rank: number
}

export type DelegationInfo = {
  address: string
  contract: string
  userUnBondable: BigNumber
  userActiveStake: BigNumber
  claimableRewards: BigNumber
  userUndelegatedList: string[]
}
