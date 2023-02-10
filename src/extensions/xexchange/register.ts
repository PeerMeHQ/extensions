import Logo from './meta/logo.svg'
import { ExtensionInfo } from '../../types'
import { XExchangeApp } from './src/XExchangeApp'

export const XExchangeExtension: ExtensionInfo = {
  Enabled: false,
  Name: 'xExchange',
  Description: 'Swap assets instantly & inexpensively.',
  Website: 'https://xexchange.com',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: ['defi'],
  AppRoot: XExchangeApp,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
}
