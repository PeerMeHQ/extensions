import { App } from './src/App'
import Logo from './meta/logo.svg'
import { Contracts } from './src/contracts'
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
  Contracts: Contracts(config),
  AppRoot: App,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
