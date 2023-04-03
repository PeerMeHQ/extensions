import { App } from './src/App'
import { XBulkContracts } from './src/contracts'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const XBulkExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: true,
  Name: 'xBulk',
  Description: 'Making Bulk-Sending of Transactions easy for DAOs',
  Website: 'https://xbulk.app',
  Logo: {
    Light: '/images/extensions/xbulk-logo.png',
    Dark: '/images/extensions/xbulk-logo.png',
  },
  Tags: ['defi'],
  Contracts: XBulkContracts(config),
  AppRoot: App,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'Tortuga Staking',
    Website: 'https://tortuga-staking.com',
  },
})
