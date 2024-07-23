import { AppEnv, ProposalAction } from '@peerme/core-ts'
import React from 'react'
import { ExtensionConfig, ExtensionScInfo } from '../../../shared/types'
import { StreamCreateActionPreview } from './previews/StreamCreateActionPreview'

const getContractAddress = (network: AppEnv) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqlrveeg222qgjgk60h7waf8md2fehtv7dlpzq9knlxq'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqqnm3x37972323nuv3l3kywev0n8q5n6gyc8qwljqz9'
}

export const CoindripContracts = (config: ExtensionConfig): ExtensionScInfo => ({
  StreamCreate: {
    Address: getContractAddress(config.network.env),
    Endpoint: 'createStream',
    ActionPreview: (action: ProposalAction) => <StreamCreateActionPreview action={action} />,
  },
})
