import { BigNumber } from 'bignumber.js'

export type DelegationProvider = {
  identity: {
    key: string
    name: string
    avatar: string
    description: string
    location: string
    url: string
  }
  contract: string
  explorerURL: string
  featured: boolean
  owner: string
  serviceFee: string
  maxDelegationCap: BigNumber
  initialOwnerFunds: string
  automaticActivation: boolean
  withDelegationCap: boolean
  changeableServiceFee: boolean
  checkCapOnRedelegate: boolean
  createdNonce: number
  unBondPeriod: number
  apr: string
  aprValue: number
  totalActiveStake: BigNumber
  totalUnStaked: string
  totalCumulatedRewards: string
  numUsers: number
  numNodes: number
  maxDelegateAmountAllowed: BigNumber
  ownerBelowRequiredBalanceThreshold: boolean
}

export type DelegationInfo = {
  address: string
  contract: string
  userUnBondable: BigNumber
  userActiveStake: BigNumber
  claimableRewards: BigNumber
  userUndelegatedList: string[]
}
