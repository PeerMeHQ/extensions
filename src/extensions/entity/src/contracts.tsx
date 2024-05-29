import { Network, ExtensionScInfo, ExtensionConfig } from '../../../shared/types'

const getContractAddress = (network: Network) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqxtccplxgycv25kjfude7mgwdm7znp9u4l3ts46euux'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqtatmxjhlxkehl37u5kz9tz7sm450xd7f27rsppynzj'
}

export const EntityContracts = (config: ExtensionConfig): ExtensionScInfo => ({
  StreamCreate: {
    Address: getContractAddress(config.network),
    Endpoint: 'boost',
  },
})
