import React from 'react'
import { ProposalAction } from '@peerme/core-ts'
import JsonAbiClaims from '../meta/claims.abi.json'
import JsonAbiMarket from '../meta/data_market.abi.json'
import { ClaimActionPreview } from './previews/ClaimActionPreview'
import { AddOfferActionPreview } from './previews/AddOfferActionPreview'
import { AcceptOfferActionPreview } from './previews/AcceptOfferActionPreview'
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
  // Market
  GetMarketRequirements: {
    Address: getMarketContractAddress(config.network),
    Endpoint: 'getRequirements',
    AbiContent: JsonAbiMarket as any,
  },
  AddOffer: {
    Address: getMarketContractAddress(config.network),
    Endpoint: 'addOffer',
    AbiContent: JsonAbiMarket as any,
    ActionPreview: (action: ProposalAction) => <AddOfferActionPreview action={action} config={config} />,
  },
  AcceptOffer: {
    Address: getMarketContractAddress(config.network),
    Endpoint: 'acceptOffer',
    AbiContent: JsonAbiMarket as any,
    ActionPreview: (action: ProposalAction) => <AcceptOfferActionPreview action={action} config={config} />,
  },
  ViewOffer: {
    Address: getMarketContractAddress(config.network),
    Endpoint: 'viewOffer',
    AbiContent: JsonAbiMarket as any,
  },
  ViewPagedOffers: {
    Address: getMarketContractAddress(config.network),
    Endpoint: 'viewPagedOffers',
    AbiContent: JsonAbiMarket as any,
  },
})
