import Logo from './meta/logo.svg'
import { XExchangeApp } from './src/XExchangeApp'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const XExchangeExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false,
  Name: 'xExchange',
  Description: 'Swap assets instantly & inexpensively.',
  Website: 'https://xexchange.com',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: ['defi'],
  Contracts: {},
  AppRoot: XExchangeApp,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
