import { ItheumApp } from './ItheumApp'
import Logo from './meta/logo.svg'
import type { ExtensionInfo } from '../../types'

export const ItheumExtension: ExtensionInfo = {
  Enabled: false,
  Name: 'Itheum',
  Description: 'Truly own and trade your data.',
  Website: 'https://www.itheum.io',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: ['itheum-data-coalition'],
  AppRoot: ItheumApp,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
}
