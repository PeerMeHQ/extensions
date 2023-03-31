import { App } from './src/App'
import Logo from './meta/logo.svg'
import { XBulkContracts } from './src/contracts'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const XBulkExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false,
  Name: 'xBulk',
  Description: "Making your DAO's life easier with lots of transactions",
  Website: 'https://xbulk.app',
  Logo: {
    Light: Logo,
    Dark: Logo,
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
