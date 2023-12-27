import { App } from './src/App'
import { Logo } from './meta/Logo'
import { Contracts } from './src/contracts'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const HatomExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false,
  Name: 'Hatom',
  Description: 'A decentralized protocol for lending, borrowing, and staking assets.',
  Website: 'https://hatom.com',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: ['defi'],
  Contracts: Contracts(config),
  AppRoot: App,
  WidgetRoots: {},
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
