import { App } from './src/App'
import { PulsarMoneyContracts } from './src/contracts'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'
import Logo from './meta/logo.svg'

export const PulsarMoneyExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false, // leave this as false, we'll enable it after the review process
  Name: 'PulsarMoney',
  Description: 'Send instant and transparent payments.',
  Website: 'app.pulsar.money',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: ['defi'],
  Contracts: PulsarMoneyContracts(config),
  AppRoot: App,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'Astrarizon',
    Website: 'astrarizon.com',
  },
})
