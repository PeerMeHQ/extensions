import { BigNumber } from 'bignumber.js'
import { DelegationInfo, DelegationProvider } from './types'
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers'

export const getDelegationProvidersRequest = async (provider: ApiNetworkProvider) => {
  const res = await provider.doGetGeneric('providers?size=10000')

  return res.map(
    (r: any) =>
      ({
        ...r,
        totalActiveStake: new BigNumber(res.totalActiveStake || 0),
        maxDelegationCap: new BigNumber(res.maxDelegationCap || 0),
        maxDelegateAmountAllowed: new BigNumber(res.maxDelegateAmountAllowed || 0),
      } as DelegationProvider)
  )
}

export const getDelegationInfoRequest = async (provider: ApiNetworkProvider, address: string) => {
  const res = await provider.doGetGeneric(`accounts/${address}/delegations?size=10000`)

  return {
    ...res,
    userUnBondable: new BigNumber(res.userUnBondable || 0),
    userActiveStake: new BigNumber(res.userActiveStake || 0),
    claimableRewards: new BigNumber(res.claimableRewards || 0),
  } as DelegationInfo
}
