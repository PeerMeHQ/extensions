import { App } from './src/DaoApp'
import { LogoBlack } from './meta/LogoBlack'
import { LogoWhite } from './meta/LogoWhite'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const DaoExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false,
  Name: 'Configure :entityName',
  Description: 'Configure your DAO on peerme.io',
  Website: 'https://peerme.io',
  Logo: {
    Light: LogoBlack,
    Dark: LogoWhite,
  },
  Tags: [],
  Contracts: {},
  AppRoot: App,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
