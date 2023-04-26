import { Network } from '../../../shared/types'

const DexDevnetUrl = 'https://stg.datadex.itheum.io'
const DexMainnetUrl = 'https://datadex.itheum.io'

export const Config = {
  TokenName: 'ITHEUM',
  TokenDecimals: 18,

  TokenId: (network: Network) => {
    if (network === 'devnet') return 'ITHEUM-a61317'
    if (network === 'testnet') return '#'
    return 'ITHEUM-df6f26'
  },

  DataNftCollection: (network: Network) => {
    if (network === 'devnet') return 'DATANFTFT2-71ac28'
    if (network === 'testnet') return '#'
    return '#'
  },

  Urls: {
    MarketplaceOffer: (network: Network, offerId: number) => {
      if (network === 'devnet') return `${DexDevnetUrl}/dataNfts/marketplace/DATANFTFT2-71ac28-7e/offer-${offerId}`
      if (network === 'testnet') return '#'
      return `${DexMainnetUrl}/dataNfts/marketplace/DATANFTFT2-71ac28-7e/offer-${offerId}`
    },
  },

  Claims: {
    OrderedTypeNames: ['Rewards', 'Airdrops', 'Allocations', 'Royalties'],
  },
}
