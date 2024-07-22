import { App } from './src/EntityApp'
import { LogoBlack } from './meta/LogoBlack'
import { LogoWhite } from './meta/LogoWhite'
import { EntityConfig } from '@peerme/core-ts'
import { EntityContracts } from './src/contracts'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const EntityExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: true,
  Name: ':entityName on PeerMe',
  Description: `Configure and interact with your ${EntityConfig.ProductName} on PeerMe.`,
  Website: 'https://peerme.io',
  Logo: {
    Light: LogoBlack,
    Dark: LogoWhite,
  },
  Tags: [],
  Contracts: EntityContracts(config),
  AppRoot: App,
  WidgetRoots: {},
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
