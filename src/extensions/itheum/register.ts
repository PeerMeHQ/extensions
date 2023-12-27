import { App } from './src/App'
import { Contracts } from './src/contracts'
import { LogoBlack } from './meta/LogoBlack'
import { LogoWhite } from './meta/LogoWhite'
import { DashboardWidget } from './src/widgets/DashboardWidget'
import type { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const ItheumExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: true,
  Name: 'Itheum',
  Description: 'Truly own and trade your data',
  Website: 'https://www.itheum.io',
  Logo: {
    Light: LogoBlack,
    Dark: LogoWhite,
  },
  Tags: ['itheum'],
  Contracts: Contracts(config),
  AppRoot: App,
  WidgetRoots: {
    Dashboard: DashboardWidget,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
