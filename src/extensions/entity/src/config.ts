import { AppEnv } from '@peerme/core-ts'

export const EntityConfig = {
  StableTokenName: 'USDC',

  StableTokenId: (network: AppEnv) => {
    if (network === 'devnet') return 'USDC-350c4e'
    if (network === 'testnet') return '#'
    return 'USDC-c76f1f'
  },
}
