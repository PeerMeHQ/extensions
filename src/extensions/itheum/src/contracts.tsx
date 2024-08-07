import { AppEnv, ProposalAction } from '@peerme/core-ts'
import React from 'react'
import { ExtensionConfig, ExtensionScInfo } from '../../../shared/types'
import { Config } from './config'
import { AcceptOfferActionPreview } from './previews/AcceptOfferActionPreview'
import { AddOfferActionPreview } from './previews/AddOfferActionPreview'
import { ClaimActionPreview } from './previews/ClaimActionPreview'
import { AddCategoryActionPreview } from './previews/coalition/AddCategoryActionPreview'
import { RemoveCategoryActionPreview } from './previews/coalition/RemoveCategoryActionPreview'

export const getClaimsContractAddress = (network: AppEnv) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqwu6qz3skzzdnmvnkknjngvrprpt4fwzffsxsr8ecca'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqnsmrn5q08eqth3fy8el87sgdj0mkhwdwl2jqnf59cg'
}

export const getMarketContractAddress = (network: AppEnv) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqlhewm06p4c9qhq32p239hs45dvry948tfsxshx3e0l'
  if (network === 'testnet') return '#'
  return 'erd1qqqqqqqqqqqqqpgqay2r64l9nhhvmaqw4qanywfd0954w2m3c77qm7drxc'
}

export const getCoalitionContractAddress = (network: AppEnv) => {
  if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgqv9w6vmvtqjrscx00swr6n8exwkn7vpsdl3ts6xxuqh'
  if (network === 'testnet') return '#'
  return '#'
}

export const Contracts = (config: ExtensionConfig): ExtensionScInfo => ({
  // Claims
  Claim: {
    Address: getClaimsContractAddress(config.network.env),
    Endpoint: 'claim',
    ActionPreview: (action: ProposalAction) => <ClaimActionPreview action={action} />,
  },
  ViewClaimWithDate: {
    Address: getClaimsContractAddress(config.network.env),
    Endpoint: 'viewClaimWithDate',
    AbiUrl: Config.Abis.Claims,
  },
  // Market
  AddOffer: {
    Address: getMarketContractAddress(config.network.env),
    Endpoint: 'addOffer',
    AbiUrl: Config.Abis.Marketplace,
    ActionPreview: (action: ProposalAction) => <AddOfferActionPreview action={action} />,
  },
  AcceptOffer: {
    Address: getMarketContractAddress(config.network.env),
    Endpoint: 'acceptOffer',
    AbiUrl: Config.Abis.Marketplace,
    ActionPreview: (action: ProposalAction) => <AcceptOfferActionPreview action={action} config={config} />,
  },
  ViewMarketRequirements: {
    Address: getMarketContractAddress(config.network.env),
    Endpoint: 'viewRequirements',
    AbiUrl: Config.Abis.Marketplace,
  },
  ViewOffer: {
    Address: getMarketContractAddress(config.network.env),
    Endpoint: 'viewOffer',
    AbiUrl: Config.Abis.Marketplace,
  },
  ViewPagedOffers: {
    Address: getMarketContractAddress(config.network.env),
    Endpoint: 'viewPagedOffers',
    AbiUrl: Config.Abis.Marketplace,
  },
  // Coalition
  GetInfo: {
    Address: getCoalitionContractAddress(config.network.env),
    Endpoint: 'getInfo',
    AbiUrl: Config.Abis.Coalition,
  },
  AddCategory: {
    Address: getCoalitionContractAddress(config.network.env),
    Endpoint: 'addCategory',
    AbiUrl: Config.Abis.Coalition,
    ActionPreview: (action: ProposalAction) => <AddCategoryActionPreview action={action} />,
  },
  RemoveCategory: {
    Address: getCoalitionContractAddress(config.network.env),
    Endpoint: 'removeCategory',
    AbiUrl: Config.Abis.Coalition,
    ActionPreview: (action: ProposalAction) => <RemoveCategoryActionPreview action={action} />,
  },
  // Aggregator
  GetAppInfo: {
    Address: '#',
    Endpoint: 'getAppInfo',
    AbiUrl: Config.Abis.Aggregator,
  },
  GetDelegationsByUser: {
    Address: '#',
    Endpoint: 'getDelegationsByUser',
    AbiUrl: Config.Abis.Aggregator,
  },
})
