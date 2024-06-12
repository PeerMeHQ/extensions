export type DelegationProvider = {
  numNodes: number
  stake: bigint
  topUp: string
  locked: string
  contract: string
  owner: string
  featured: boolean
  serviceFee: number
  delegationCap: bigint
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
  userUnBondable: bigint
  userActiveStake: bigint
  claimableRewards: bigint
  userUndelegatedList: string[]
}
