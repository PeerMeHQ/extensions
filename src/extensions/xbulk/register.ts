import Logo from './meta/logo.svg'
import { XBulkApp } from './src/XBulkApp'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const XBulkExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false,
  Name: 'xBulk',
  Description: "Making your DAO's life easier with lots of transactions.",
  Website: 'https://xbulk.app',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: ['bulk'],
  Contracts: {},
  AppRoot: XBulkApp,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'Tortuga Staking',
    Website: 'https://tortuga-staking.com/',
  },
})
