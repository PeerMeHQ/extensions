import { AppEnv, ProposalAction } from '@peerme/core-ts'
import React from 'react'
import { ExtensionConfig, ExtensionScInfo } from '../../../shared/types'
import { GuildDeployActionPreview } from './previews/GuildDeployActionPreview'

const getContractAddress = (network: AppEnv) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqdn50wfstjtkrlzer9plgu5wgyrpnxtyxzeus6t472f'
  if (network === 'testnet') return '#'
  return '#'
}

export const Contracts = (config: ExtensionConfig): ExtensionScInfo => ({
  GuildDeploy: {
    Address: getContractAddress(config.network.env),
    Endpoint: 'deployGuild',
    ActionPreview: (action: ProposalAction) => <GuildDeployActionPreview action={action} />,
  },
})
