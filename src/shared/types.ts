import { ApiNetworkProvider, TokenTransfer, Transaction, TypedValue } from '@multiversx/sdk-core'
import {
  AppNetwork,
  Entity,
  EntityTag,
  ProposalAction,
  ScInfo,
  SearchServiceConfig,
  UserPrivate,
} from '@peerme/core-ts'
import React, { SVGProps } from 'react'

/**
 * Extension
 */

export type ExtensionConfig = {
  network: AppNetwork
  entity: Entity
  user: UserPrivate | null
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
    value: bigint,
    args: TypedValue[],
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
