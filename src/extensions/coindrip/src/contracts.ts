import { ProposalAction } from '@peerme/core-ts'
import { Network, ExtensionScInfo, ExtensionConfig } from '../../../types'

const getContractAddress = (network: Network) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqlrveeg222qgjgk60h7waf8md2fehtv7dlpzq9knlxq'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqqnm3x37972323nuv3l3kywev0n8q5n6gyc8qwljqz9'
}

export const CoindripContracts = (config: ExtensionConfig): ExtensionScInfo => ({
  StreamCreate: {
    Address: getContractAddress(config.network),
    Endpoint: 'createStream',
    ActionPreview: (action: ProposalAction) =>
      `create a token stream of ${action.payments[0].amount} to ${action.arguments[0]!}`,
  },
})
