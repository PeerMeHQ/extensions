import React from 'react'
import { Config } from './config'
import { ProposalAction } from '@peerme/core-ts'
import { ClaimActionPreview } from './previews/ClaimActionPreview'
import { AddOfferActionPreview } from './previews/AddOfferActionPreview'
import { AcceptOfferActionPreview } from './previews/AcceptOfferActionPreview'
import { Network, ExtensionScInfo, ExtensionConfig } from '../../../shared/types'
import { AddCategoryActionPreview } from './previews/coalition/AddCategoryActionPreview'
import { RemoveCategoryActionPreview } from './previews/coalition/RemoveCategoryActionPreview'

export const getClaimsContractAddress = (network: Network) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqwu6qz3skzzdnmvnkknjngvrprpt4fwzffsxsr8ecca'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqnsmrn5q08eqth3fy8el87sgdj0mkhwdwl2jqnf59cg'
}

export const getMarketContractAddress = (network: Network) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqlhewm06p4c9qhq32p239hs45dvry948tfsxshx3e0l'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqay2r64l9nhhvmaqw4qanywfd0954w2m3c77qm7drxc'
}

export const getCoalitionContractAddress = (network: Network) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqv9w6vmvtqjrscx00swr6n8exwkn7vpsdl3ts6xxuqh'
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
    AbiUrl: Config.Abis.Claims,
  },
  // Market
  AddOffer: {
    Address: getMarketContractAddress(config.network),
    Endpoint: 'addOffer',
    AbiUrl: Config.Abis.Marketplace,
    ActionPreview: (action: ProposalAction) => <AddOfferActionPreview action={action} />,
  },
  AcceptOffer: {
    Address: getMarketContractAddress(config.network),
    Endpoint: 'acceptOffer',
    AbiUrl: Config.Abis.Marketplace,
    ActionPreview: (action: ProposalAction) => <AcceptOfferActionPreview action={action} config={config} />,
  },
  ViewMarketRequirements: {
    Address: getMarketContractAddress(config.network),
    Endpoint: 'viewRequirements',
    AbiUrl: Config.Abis.Marketplace,
  },
  ViewOffer: {
    Address: getMarketContractAddress(config.network),
    Endpoint: 'viewOffer',
    AbiUrl: Config.Abis.Marketplace,
  },
  ViewPagedOffers: {
    Address: getMarketContractAddress(config.network),
    Endpoint: 'viewPagedOffers',
    AbiUrl: Config.Abis.Marketplace,
  },
  // Coalition
  GetInfo: {
    Address: getCoalitionContractAddress(config.network),
    Endpoint: 'getInfo',
    AbiUrl: Config.Abis.Coalition,
  },
  AddCategory: {
    Address: getCoalitionContractAddress(config.network),
    Endpoint: 'addCategory',
    AbiUrl: Config.Abis.Coalition,
    ActionPreview: (action: ProposalAction) => <AddCategoryActionPreview action={action} />,
  },
  RemoveCategory: {
    Address: getCoalitionContractAddress(config.network),
    Endpoint: 'removeCategory',
    AbiUrl: Config.Abis.Coalition,
    ActionPreview: (action: ProposalAction) => <RemoveCategoryActionPreview action={action} />,
  },
})
