import { AppEnv, ProposalAction } from '@peerme/core-ts'
import React from 'react'
import { ExtensionConfig, ExtensionScInfo } from '../../../shared/types'
import { BoostActionPreview } from './previews/BoostActionPreview'

const getContractAddress = (network: AppEnv) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqxtccplxgycv25kjfude7mgwdm7znp9u4l3ts46euux'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqtatmxjhlxkehl37u5kz9tz7sm450xd7f27rsppynzj'
}

export const EntityContracts = (config: ExtensionConfig): ExtensionScInfo => ({
  Boost: {
    Address: getContractAddress(config.network.env),
    Endpoint: 'boost',
    ActionPreview: (action: ProposalAction) => <BoostActionPreview action={action} />,
  },
})
