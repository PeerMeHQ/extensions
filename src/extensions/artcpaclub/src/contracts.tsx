import React from 'react'
import { Config } from './config'
import { ProposalAction } from '@peerme/core-ts'
import { StakeEsdtActionPreview } from './previews/StakeEsdtActionPreview'
import { ClaimEsdtActionPreview } from './previews/ClaimEsdtActionPreview'
import { UnstakeEsdtActionPreview } from './previews/UnstakeEsdtActionPreview'
import { Network, ExtensionScInfo, ExtensionConfig } from '../../../shared/types'

const getEsdtPoolContractAddress = (network: Network) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqagtkct3gswr62z3p2qdqlf5l2ukseu2ql3tsjl02gh'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqj8exjpz38agu78sxh5rlxcp2kmxy35m6kqysscypf3'
}

const getNftPoolContractAddress = (network: Network) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqzfk3v0rvwuucjh9xg4zjt6y3jdm4g569l3tsjfey97'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqfken0exk7jpr85dx6f8ym3jgcagesfcqkqys0xnquf'
}

export const Contracts = (config: ExtensionConfig): ExtensionScInfo => ({
  EsdtUserStake: {
    Address: getEsdtPoolContractAddress(config.network),
    Endpoint: 'userStake',
    ActionPreview: (action: ProposalAction) => <StakeEsdtActionPreview action={action} config={config} />,
  },
  EsdtUserUnstake: {
    Address: getEsdtPoolContractAddress(config.network),
    Endpoint: 'userUnstake',
    ActionPreview: (action: ProposalAction) => <UnstakeEsdtActionPreview action={action} config={config} />,
  },
  EsdtUserClaim: {
    Address: getEsdtPoolContractAddress(config.network),
    Endpoint: 'userClaim',
    ActionPreview: (action: ProposalAction) => <ClaimEsdtActionPreview action={action} config={config} />,
  },
  EsdtViewPool: {
    Address: getEsdtPoolContractAddress(config.network),
    Endpoint: 'viewPool',
    AbiUrl: Config.Abis.EsdtStaking,
  },
  NftUserStake: {
    Address: getNftPoolContractAddress(config.network),
    Endpoint: 'userStake',
    ActionPreview: (action: ProposalAction) => <StakeEsdtActionPreview action={action} config={config} />,
  },
  NftUserUnstake: {
    Address: getNftPoolContractAddress(config.network),
    Endpoint: 'userUnstake',
    ActionPreview: (action: ProposalAction) => <UnstakeEsdtActionPreview action={action} config={config} />,
  },
  NftUserClaim: {
    Address: getNftPoolContractAddress(config.network),
    Endpoint: 'userClaim',
    ActionPreview: (action: ProposalAction) => <ClaimEsdtActionPreview action={action} config={config} />,
  },
  NftViewPool: {
    Address: getNftPoolContractAddress(config.network),
    Endpoint: 'viewPool',
    AbiUrl: Config.Abis.NftStaking,
  },
})
