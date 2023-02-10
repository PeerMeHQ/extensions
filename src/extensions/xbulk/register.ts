import Logo from './meta/logo.svg'
import { XBulkApp } from './src/XBulkApp'
import { ExtensionInfo } from '../../types'

export const XBulkExtension: ExtensionInfo = {
  Enabled: false,
  Name: 'xBulk',
  Description: 'Sends DAO transactions in bulk.',
  Website: 'https://xbulk.app',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: ['defi'],
  AppRoot: XBulkApp,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
}
