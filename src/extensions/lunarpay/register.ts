import { App } from './src/App'
import { Contracts } from './src/contracts'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const LunarPayExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false,
  Name: 'LunarPay',
  Description: 'Payments made simple for WEB3 businesses.',
  Website: 'https://lunarpay.finance',
  Logo: {
    Light: '/images/extensions/lunarpay-logo.svg',
    Dark: '/images/extensions/lunarpay-logo.svg',
  },
  Tags: ['defi'],
  Contracts: Contracts(config),
  AppRoot: App,
  WidgetRoots: {},
  Developer: {
    Name: 'LunarPay',
    Website: 'https://lunarpay.finance',
  },
})
