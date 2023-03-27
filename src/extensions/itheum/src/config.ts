import { Network } from '../../../shared/types'

export const Config = {
  Urls: {
    MarketplaceOffer: (network: Network, offerId: number) => {
      if (network === 'devnet')
        return `https://deploy-preview-309--frosty-hermann-85ca4f.netlify.app/dataNfts/marketplace/DATANFTFT2-71ac28-7e/offer-${offerId}`
      if (network === 'testnet') return '#'
      return '#'
    },
  },

  Claims: {
    OrderedTypeNames: ['Rewards', 'Airdrops', 'Allocations', 'Royalties'],
  },
}
