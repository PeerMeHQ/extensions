import Logo from './meta/logo.svg'
import { Coindrip } from './src/Coindrip'
import type { AppInfo } from '../../types'

export const CoindripApp: AppInfo = {
  Enabled: true,
  Name: 'Coindrip',
  Description: 'A protocol for real-time ESDT payments.',
  Website: 'https://coindrip.finance',
  Logo: Logo,
  Tags: ['payments'],
  AppRoot: Coindrip,
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
}
