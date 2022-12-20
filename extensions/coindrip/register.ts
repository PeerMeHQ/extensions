import Logo from './meta/logo.svg'
import { Coindrip } from './Coindrip'
import type { App } from '../../src/types'

export const CoindripApp: App = {
  Enabled: true,
  Name: 'Coindrip',
  Description: 'A protocol for real-time ESDT payments.',
  Website: 'https://coindrip.finance',
  Logo: Logo,
  Tags: ['payments'],
  AppRoot: Coindrip,
  Developer: {
    Name: 'Superciety',
    Website: 'https://superciety.com',
  },
}
