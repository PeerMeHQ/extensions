import Logo from './meta/logo.svg'
import { XBulkApp } from './src/XBulkApp'
import { ExtensionConfig, ExtensionInfo } from '../_shared/types'

export const XBulkExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false,
  Name: 'xBulk',
  Description: 'Sends DAO transactions in bulk.',
  Website: 'https://xbulk.app',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: ['defi'],
  Contracts: {},
  AppRoot: XBulkApp,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
