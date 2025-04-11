import { ApiNetworkProvider } from '@multiversx/sdk-core'
import { DelegationInfo, DelegationProvider } from './types'

export const getDelegationProvidersRequest = async (provider: ApiNetworkProvider): Promise<DelegationProvider[]> => {
  const res = await provider.doGetGeneric('providers?withIdentityInfo=true&size=10000')
  const providers: DelegationProvider[] = res.map(
    (r: any) =>
      ({
        ...r,
        contract: r.provider,
        stake: BigInt(res.stake || 0),
        delegationCap: BigInt(res.delegationCap || 0),
      } as DelegationProvider)
  )

  return providers.filter((p) => !!p.identityInfo)
}

export const getDelegationInfoRequest = async (
  provider: ApiNetworkProvider,
  address: string
): Promise<DelegationInfo[]> => {
  const res = await provider.doGetGeneric(`accounts/${address}/delegation?size=10000`)

  return res.map(
    (r: any) =>
      ({
        ...r,
        userUnBondable: BigInt(r.userUnBondable || 0),
        userActiveStake: BigInt(r.userActiveStake || 0),
        claimableRewards: BigInt(r.claimableRewards || 0),
      } as DelegationInfo)
  )
}
