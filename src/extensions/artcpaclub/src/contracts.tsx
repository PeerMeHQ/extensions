import { Network, ExtensionScInfo, ExtensionConfig } from '../../../shared/types'

const getContractAddress = (network: Network) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqagtkct3gswr62z3p2qdqlf5l2ukseu2ql3tsjl02gh'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqj8exjpz38agu78sxh5rlxcp2kmxy35m6kqysscypf3'
}

export const Contracts = (config: ExtensionConfig): ExtensionScInfo => ({
  UserStake: {
    Address: getContractAddress(config.network),
    Endpoint: 'userStake',
  },
  UserUnstake: {
    Address: getContractAddress(config.network),
    Endpoint: 'userUnstake',
  },
})
