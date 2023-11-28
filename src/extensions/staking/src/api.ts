import { BigNumber } from 'bignumber.js'
import { DelegationInfo, DelegationProvider } from './types'
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers'

export const getDelegationProvidersRequest = async (provider: ApiNetworkProvider): Promise<DelegationProvider[]> => {
  const res = await provider.doGetGeneric('providers?withIdentityInfo=true&size=10000')
  const providers: DelegationProvider[] = res.map(
    (r: any) =>
      ({
        ...r,
        contract: r.provider,
        stake: new BigNumber(res.stake || 0),
        delegationCap: new BigNumber(res.delegationCap || 0),
      } as DelegationProvider)
  )

  return providers.filter((p) => !!p.identityInfo)
}

export const getDelegationInfoRequest = async (
  provider: ApiNetworkProvider,
  address: string
): Promise<DelegationInfo[]> => {
  const res = await provider.doGetGeneric(`accounts/${address}/delegation?size=10000`)
  console.log('del', res)
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
