import { Network } from '../../../types'

export const getContractAddress = (network: Network) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqlrveeg222qgjgk60h7waf8md2fehtv7dlpzq9knlxq'
  if (network === 'testnet') return '#' // TODO: set TESTNET address once known
  return 'erd1qqqqqqqqqqqqqpgqqnm3x37972323nuv3l3kywev0n8q5n6gyc8qwljqz9'
}
