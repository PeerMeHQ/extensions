import { AppEnv } from '@peerme/core-ts'
import { ExtensionConfig, ExtensionScInfo } from '../../../shared/types'

const getContractAddress = (network: AppEnv) => {
  if (network === 'devnet') return '#'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgquef97h66mjmgghdglpkjllamt2hjz2zcaykqpwwurh'
}

export const Contracts = (config: ExtensionConfig): ExtensionScInfo => ({
  Stake: {
    Address: getContractAddress(config.network.env),
    Endpoint: 'createNewStake',
  },
  ClaimRewards: {
    Address: getContractAddress(config.network.env),
    Endpoint: 'claimRewards',
  },
})
