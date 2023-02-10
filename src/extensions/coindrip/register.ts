import Logo from './meta/logo.svg'
import { CoindripApp } from './src/CoindripApp'
import type { ExtensionInfo } from '../../types'

export const CoindripExtension: ExtensionInfo = {
  Enabled: true,
  Name: 'Coindrip',
  Description: 'A protocol for real-time ESDT payments.',
  Website: 'https://coindrip.finance',
  Logo: Logo,
  Tags: ['defi'],
  AppRoot: CoindripApp,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
}
