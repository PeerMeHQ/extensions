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
}
