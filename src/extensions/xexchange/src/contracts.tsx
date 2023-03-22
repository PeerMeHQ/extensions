import { Network, ExtensionScInfo, ExtensionConfig } from '../../../shared/types'

const getContractAddress = (network: Network) => {
  if (network === 'devnet') return '#'
  if (network === 'testnet') return '#'
  return '#'
}

export const Contracts = (config: ExtensionConfig): ExtensionScInfo => ({})
