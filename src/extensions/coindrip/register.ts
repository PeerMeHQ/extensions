import { App } from './src/App'
import Logo from './meta/logo.svg'
import { CoindripContracts } from './src/contracts'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const CoindripExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: true,
  Name: 'CoinDrip',
  Description: 'A protocol for real-time ESDT payments',
  Website: 'https://coindrip.finance',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: ['defi'],
  Contracts: CoindripContracts(config),
  AppRoot: App,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
