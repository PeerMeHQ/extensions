import React from 'react'
import { ProposalAction } from '@peerme/core-ts'
import JsonAbiClaims from '../meta/claims.abi.json'
import { ClaimActionPreview } from './previews/ClaimActionPreview'
import { Network, ExtensionScInfo, ExtensionConfig } from '../../../shared/types'

const getClaimsContractAddress = (network: Network) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqd8vswwygp8sgmm6rd2x4rfgxjvv4fa93fsxsks7y6q'
  if (network === 'testnet') return '#'
  return '#'
}

const getMarketContractAddress = (network: Network) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqca3crd27vj8cruuxzkkma548fy8q69hxfsxsw2wxwy'
  if (network === 'testnet') return '#'
  return '#'
}

export const Contracts = (config: ExtensionConfig): ExtensionScInfo => ({
  // Claims
  Claim: {
    Address: getClaimsContractAddress(config.network),
    Endpoint: 'claim',
    ActionPreview: (action: ProposalAction) => <ClaimActionPreview action={action} />,
  },
  ViewClaimWithDate: {
    Address: getClaimsContractAddress(config.network),
    Endpoint: 'viewClaimWithDate',
    AbiContent: JsonAbiClaims as any,
  },
})
