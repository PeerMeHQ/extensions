import { Network } from '../../../shared/types'

const DexDevnetUrl = 'https://stg.datadex.itheum.io'
const DexMainnetUrl = 'https://datadex.itheum.io'

export const Config = {
  TokenName: 'ITHEUM',
  TokenDecimals: 18,

  Abis: {
    Claims: 'https://peerme.io/abis/itheum/claims.abi.json',
    Marketplace: 'https://peerme.io/abis/itheum/data_market.abi.json',
    DataNft: 'https://peerme.io/abis/itheum/datanftmint.abi.json',
    Coalition: 'https://peerme.io/abis/itheum/data-coalition.abi.json',
  },

  TokenId: (network: Network) => {
    if (network === 'devnet') return 'ITHEUM-fce905'
    if (network === 'testnet') return '#'
    return 'ITHEUM-df6f26'
  },

  DataNftCollection: (network: Network) => {
    if (network === 'devnet') return 'DATANFTFT-e0b917'
    if (network === 'testnet') return '#'
    return 'DATANFTFT-e936d4'
  },

  Urls: {
    Web: 'https://itheum.io',
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
