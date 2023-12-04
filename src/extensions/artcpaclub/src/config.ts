import { Network } from '../../../shared/types'

export const Config = {
  ApiBaseUrl: (network: Network) => {
    if (network === 'devnet') return 'https://devnet-api.artcpaclub.com/api'
    return 'https://api.artcpaclub.com/api'
  },

  MarketplaceUrl: (network: Network) => {
    if (network === 'devnet') return 'https://devnet-marketplace.artcpaclub.com'
    return 'https://marketplace.artcpaclub.com'
  },

  Abis: {
    EsdtStaking: 'https://marketplace.artcpaclub.com/peerme-extension/esdt-staking.abi.json',
    NftStaking: 'https://marketplace.artcpaclub.com/peerme-extension/nft-staking.abi.json',
  },
}
