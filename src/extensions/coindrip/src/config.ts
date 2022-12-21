import { AppNetwork } from '../../../types'

export const getContractAddress = (network: AppNetwork) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqlrveeg222qgjgk60h7waf8md2fehtv7dlpzq9knlxq'
  if (network === 'testnet') return '#' // TODO: set TESTNET address once known
  return '#' // TODO: set MAINNET address once known
}
