import { Network } from '../../../shared/types'

export const EntityConfig = {
  StableTokenName: 'USDC',

  StableTokenId: (network: Network) => {
    if (network === 'devnet') return 'USDC-350c4e'
    if (network === 'testnet') return '#'
    return 'USDC-c76f1f'
  },
}
