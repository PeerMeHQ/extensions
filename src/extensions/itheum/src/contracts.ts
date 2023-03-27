import JsonAbiClaims from '../meta/claims.abi.json'
import { Network, ExtensionScInfo, ExtensionConfig } from '../../../shared/types'

const getClaimsContractAddress = (network: Network) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqd8vswwygp8sgmm6rd2x4rfgxjvv4fa93fsxsks7y6q'
  if (network === 'testnet') return '#'
  return '#'
}

export const Contracts = (config: ExtensionConfig): ExtensionScInfo => ({
  Claim: {
    Address: getClaimsContractAddress(config.network),
    Endpoint: 'claim',
  },
  ViewClaimWithDate: {
    Address: getClaimsContractAddress(config.network),
    Endpoint: 'viewClaimWithDate',
    AbiContent: JsonAbiClaims as any,
  },
})
