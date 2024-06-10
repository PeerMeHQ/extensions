import React, { SVGProps } from 'react'
import { BigNumber } from 'bignumber.js'
import { TokenTransfer, Transaction } from '@multiversx/sdk-core'
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers'
import {
  ScInfo,
  Entity,
  EntityTag,
  UserPrivate,
  ChainWallet,
  ProposalAction,
  ProposalActionArg,
  SearchServiceConfig,
} from '@peerme/core-ts'

export type Network = 'devnet' | 'testnet' | 'mainnet'

/**
 * Extension
 */

export type ExtensionConfig = {
  network: Network
  entity: Entity
  user: UserPrivate | null
  walletConfig: ChainWallet
  searchConfig: SearchServiceConfig
  hasEarlyAccess: boolean
  dark: boolean
}

export type ExtensionScInfo = {
  [key: string]: ScInfo
}

export type ExtensionInfo = {
  Enabled: boolean
  Name: string
  Description: string
  Website: string
  Logo: {
    Light: React.FC<SVGProps<SVGSVGElement>> | string
    Dark: React.FC<SVGProps<SVGSVGElement>> | string
  }
  Tags: EntityTag[]
  Contracts: ExtensionScInfo
  AppRoot: React.FC | null
  WidgetRoots: {
    Dashboard?: React.FC<WidgetRootProps> | null
    Info?: React.FC<WidgetRootProps> | null
  }
  Developer: {
    Name: string
    Website: string
  }
}

/**
 * App
 */
export type AppToastType = 'success' | 'info' | 'warning' | 'error' | 'vibe'

export type AppContextValue = {
  config: ExtensionConfig
  networkProvider: ApiNetworkProvider
  requestProposalAction: (
    destination: string,
    endpoint: string | null,
    value: BigNumber.Value,
    args: ProposalActionArg[],
    payments: TokenTransfer[]
  ) => void
  requestDirectProposalAction: (action: ProposalAction) => void
  requestUserAction: (tx: Transaction) => void
  showToast: (text: string, type?: AppToastType) => void
}

/**
 * Widget
 */
export type WidgetRootProps = {
  config: ExtensionConfig
}
