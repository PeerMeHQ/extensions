import { App } from './src/App'
import LogoBlack from './meta/logo-black.svg'
import LogoWhite from './meta/logo-white.svg'
import type { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const ItheumExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false,
  Name: 'Itheum',
  Description: 'Truly own and trade your data',
  Website: 'https://www.itheum.io',
  Logo: {
    Light: LogoBlack,
    Dark: LogoWhite,
  },
  Tags: ['itheum-data-coalition'],
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
