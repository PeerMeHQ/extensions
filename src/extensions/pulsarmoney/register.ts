import { App } from './src/App'
import Logo from './meta/logo.svg'
import { Contracts } from './src/contracts'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const PulsarMoneyExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false, // leave this as false, we'll enable it after the review process
  Name: 'PulsarMoney',
  Description: '<describe your extension in a few words>',
  Website: '<your app website>',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: [],
  Contracts: Contracts(config),
  AppRoot: App,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: '<your name>',
    Website: '<your website>',
  },
})
