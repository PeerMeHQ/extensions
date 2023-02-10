import { Entity, EntityTag, ProposalAction, SearchServiceConfig } from '@peerme/core-ts'

export type Network = 'devnet' | 'testnet' | 'mainnet'

/**
 * Extension
 */

export type ExtensionConfig = {
  network: Network
  entity: Entity
  searchConfig: SearchServiceConfig
  hasEarlyAccess: boolean
}

export type ExtensionInfo = {
  Enabled: boolean
  Name: string
  Description: string
  Website: string
  Logo: string
  Tags: EntityTag[]
  AppRoot: React.FC<AppRootProps>
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
