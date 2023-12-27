import { App } from './src/App'
import { Contracts } from './src/contracts'
import { LogoBlack } from './meta/LogoBlack'
import { LogoWhite } from './meta/LogoWhite'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const MyExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false, // leave this as false, we'll enable it after the review process
  Name: '<your app name>',
  Description: '<describe your extension in a few words>',
  Website: '<your app website>',
  Logo: {
    Light: LogoBlack,
    Dark: LogoWhite,
  },
  Tags: [],
  Contracts: Contracts(config),
  AppRoot: App,
  WidgetRoots: {},
  Developer: {
    Name: '<your name>',
    Website: '<your website>',
  },
})
