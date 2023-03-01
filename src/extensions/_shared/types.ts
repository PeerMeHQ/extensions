import { ChainWallet, Entity, EntityTag, ProposalAction, ScInfo, SearchServiceConfig } from '@peerme/core-ts'

export type Network = 'devnet' | 'testnet' | 'mainnet'

/**
 * Extension
 */

export type ExtensionConfig = {
  network: Network
  entity: Entity
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
    Light: string
    Dark: string
  }
  Tags: EntityTag[]
  Contracts: ExtensionScInfo
  AppRoot: React.FC<AppRootProps> | null
  WidgetRoots: {
    Info: React.FC<WidgetRootProps> | null
  }
  Developer: {
    Name: string
    Website: string
  }
}

/**
 * App
 */
export type AppRootProps = {
  config: ExtensionConfig
  onActionAddRequest: (action: ProposalAction) => void
}

/**
 * Widget
 */
export type WidgetRootProps = {
  config: ExtensionConfig
}
