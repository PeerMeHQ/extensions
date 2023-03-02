import Logo from './meta/logo.svg'
import { CoindripApp } from './src/CoindripApp'
import { CoindripContracts } from './src/contracts'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const CoindripExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: true,
  Name: 'CoinDrip',
  Description: 'A protocol for real-time ESDT payments.',
  Website: 'https://coindrip.finance',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: ['defi'],
  Contracts: CoindripContracts(config),
  AppRoot: CoindripApp,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
