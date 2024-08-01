import { ExtensionConfig, ExtensionInfo } from '../../shared/types'
import { Logo } from './meta/Logo'
import { App } from './src/App'
import { Contracts } from './src/contracts'

export const XMoneyExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false,
  Name: 'xMoney Guilds',
  Description: 'Manage xMoney Guilds with your teams.',
  Website: 'https://guilds.xmoney.com',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: ['defi'],
  Contracts: Contracts(config),
  AppRoot: App,
  WidgetRoots: {},
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
