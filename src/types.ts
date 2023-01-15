import { Entity, ProposalAction } from '@peerme/core-ts'

export type AppNetwork = 'devnet' | 'testnet' | 'mainnet'

// if you would like to add a tags that is not available, please get in touch before adding it here
export type AppTag = 'payments' | 'exchange' | 'gaming'

export type AppConfig = {
  network: AppNetwork
  entity: Entity
}

export type AppRootProps = {
  config: AppConfig
  onActionAddRequest: (action: ProposalAction) => void
}

export type AppInfo = {
  Enabled: boolean
  Name: string
  Description: string
  Website: string
  Logo: string
  Tags: AppTag[]
  AppRoot: React.FC<AppRootProps>
  Developer: {
    Name: string
    Website: string
  }
}
