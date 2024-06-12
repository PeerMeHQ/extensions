import React from 'react'
import { ProposalAction } from '@peerme/core-ts'
import { BulkSendActionPreview } from './previews/BulkSendActionPreview'
import { BulkSendSameAmountActionPreview } from './previews/BulkSendSameAmountActionPreview'
import { AppEnv, ExtensionScInfo, ExtensionConfig } from '../../../shared/types'

const getContractAddress = (network: AppEnv) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgq7qdqsuq4a4pga2hxa5h0gvluf7hlc6hndn3q32jth5'
  if (network === 'testnet') return 'erd1qqqqqqqqqqqqqpgq5j3wahajwehwja70v39074zzzjsq89lkdn3qp3j2f9'
  return 'erd1qqqqqqqqqqqqqpgqwcv369k9x49ve3qlu0h5qe949w7m6gcxh42scqtdpf'
}

export const Contracts = (config: ExtensionConfig): ExtensionScInfo => ({
  BulkSend: {
    Address: getContractAddress(config.env),
    Endpoint: 'bulksend',
    ActionPreview: (action: ProposalAction) => <BulkSendActionPreview action={action} />,
  },
  BulkSendSameAmount: {
    Address: getContractAddress(config.env),
    Endpoint: 'bulksendSameAmount',
    ActionPreview: (action: ProposalAction) => <BulkSendSameAmountActionPreview action={action} />,
  },
})
