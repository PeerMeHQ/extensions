import { AppEnv, ExtensionScInfo, ExtensionConfig } from '../../../shared/types'

const getContractAddress = (network: AppEnv) => {
  if (network === 'devnet') return '#'
  if (network === 'testnet') return '#'
  return '#'
}

export const Contracts = (config: ExtensionConfig): ExtensionScInfo => ({
  YourCustomScEndpoint: {
    Address: getContractAddress(config.network.env),
    Endpoint: 'yourCustomScEndpoint',
  },
})
