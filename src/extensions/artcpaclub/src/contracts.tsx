import React from 'react'
import { Config } from './config'
import { ProposalAction } from '@peerme/core-ts'
import { StakeEsdtActionPreview } from './previews/StakeEsdtActionPreview'
import { UnstakeEsdtActionPreview } from './previews/UnstakeEsdtActionPreview'
import { Network, ExtensionScInfo, ExtensionConfig } from '../../../shared/types'

const getContractAddress = (network: Network) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqagtkct3gswr62z3p2qdqlf5l2ukseu2ql3tsjl02gh'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqj8exjpz38agu78sxh5rlxcp2kmxy35m6kqysscypf3'
}

export const Contracts = (config: ExtensionConfig): ExtensionScInfo => ({
  UserStake: {
    Address: getContractAddress(config.network),
    Endpoint: 'userStake',
    ActionPreview: (action: ProposalAction) => <StakeEsdtActionPreview action={action} config={config} />,
  },
  UserUnstake: {
    Address: getContractAddress(config.network),
    Endpoint: 'userUnstake',
    ActionPreview: (action: ProposalAction) => <UnstakeEsdtActionPreview action={action} config={config} />,
  },
  ViewPool: {
    Address: getContractAddress(config.network),
    Endpoint: 'viewPool',
    AbiUrl: Config.Abis.EsdtStaking,
  },
})
