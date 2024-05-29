import { App } from './src/EntityApp'
import { EntityConfig } from '@peerme/core-ts'
import { LogoBlack } from './meta/LogoBlack'
import { LogoWhite } from './meta/LogoWhite'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const DaoExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false,
  Name: ':entityName on PeerMe',
  Description: `Configure and interact with your ${EntityConfig.ProductName} on PeerMe.`,
  Website: 'https://peerme.io',
  Logo: {
    Light: LogoBlack,
    Dark: LogoWhite,
  },
  Tags: [],
  Contracts: {},
  AppRoot: App,
  WidgetRoots: {},
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
