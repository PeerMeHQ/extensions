import { AppEnv, ProposalAction } from '@peerme/core-ts'
import React from 'react'
import { ExtensionConfig, ExtensionScInfo } from '../../../shared/types'
import { Config } from './config'
import { ClaimActionPreview } from './previews/ClaimActionPreview'
import { StakeActionPreview } from './previews/StakeActionPreview'
import { UnstakeActionPreview } from './previews/UnstakeActionPreview'

const getEsdtPoolContractAddress = (network: AppEnv) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqagtkct3gswr62z3p2qdqlf5l2ukseu2ql3tsjl02gh'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqj8exjpz38agu78sxh5rlxcp2kmxy35m6kqysscypf3'
}

const getNftPoolContractAddress = (network: AppEnv) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqzfk3v0rvwuucjh9xg4zjt6y3jdm4g569l3tsjfey97'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqfken0exk7jpr85dx6f8ym3jgcagesfcqkqys0xnquf'
}

export const Contracts = (config: ExtensionConfig): ExtensionScInfo => ({
  EsdtUserStake: {
    Address: getEsdtPoolContractAddress(config.network.env),
    Endpoint: 'userStake',
    ActionPreview: (action: ProposalAction) => <StakeActionPreview action={action} config={config} />,
  },
  EsdtUserUnstake: {
    Address: getEsdtPoolContractAddress(config.network.env),
    Endpoint: 'userUnstake',
    ActionPreview: (action: ProposalAction) => <UnstakeActionPreview action={action} config={config} />,
  },
  EsdtUserClaim: {
    Address: getEsdtPoolContractAddress(config.network.env),
    Endpoint: 'userClaim',
    ActionPreview: (action: ProposalAction) => <ClaimActionPreview action={action} config={config} />,
  },
  EsdtViewPool: {
    Address: getEsdtPoolContractAddress(config.network.env),
    Endpoint: 'viewPool',
    AbiUrl: Config.Abis.EsdtStaking,
  },
  NftUserStake: {
    Address: getNftPoolContractAddress(config.network.env),
    Endpoint: 'userStake',
    ActionPreview: (action: ProposalAction) => <StakeActionPreview action={action} config={config} />,
  },
  NftUserUnstake: {
    Address: getNftPoolContractAddress(config.network.env),
    Endpoint: 'userUnstake',
    ActionPreview: (action: ProposalAction) => <UnstakeActionPreview action={action} config={config} />,
  },
  NftUserClaim: {
    Address: getNftPoolContractAddress(config.network.env),
    Endpoint: 'userClaim',
    ActionPreview: (action: ProposalAction) => <ClaimActionPreview action={action} config={config} />,
  },
  NftViewPool: {
    Address: getNftPoolContractAddress(config.network.env),
    Endpoint: 'viewPool',
    AbiUrl: Config.Abis.NftStaking,
  },
})
