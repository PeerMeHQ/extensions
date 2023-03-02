import Logo from './meta/logo.svg'
import { ItheumApp } from './ItheumApp'
import type { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const ItheumExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false,
  Name: 'Itheum',
  Description: 'Truly own and trade your data.',
  Website: 'https://www.itheum.io',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: ['itheum-data-coalition'],
  Contracts: {},
  AppRoot: ItheumApp,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
