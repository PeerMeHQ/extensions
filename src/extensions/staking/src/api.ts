import { BigNumber } from 'bignumber.js'
import { DelegationInfo, DelegationProvider } from './types'
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers'

export const getDelegationProvidersRequest = async (provider: ApiNetworkProvider): Promise<DelegationProvider[]> => {
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

export const getDelegationInfoRequest = async (
  provider: ApiNetworkProvider,
  address: string
): Promise<DelegationInfo[]> => {
  const res = await provider.doGetGeneric(`accounts/${address}/delegations?size=10000`)

  return res.map(
    (r: any) =>
      ({
        ...r,
        userUnBondable: new BigNumber(r.userUnBondable || 0),
        userActiveStake: new BigNumber(r.userActiveStake || 0),
        claimableRewards: new BigNumber(r.claimableRewards || 0),
      } as DelegationInfo)
  )
}
