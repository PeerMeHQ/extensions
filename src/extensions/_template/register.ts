import Logo from './meta/logo.svg'
import { MyApp } from './src/MyApp'
import { ExtensionConfig, ExtensionInfo } from '../../types'

export const MyExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false, // leave this as false, we'll enable it after the review process
  Name: '<your app name>',
  Description: '<describe your extension in a few words>',
  Website: '<your app website>',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: [],
  Contracts: {},
  AppRoot: MyApp,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: '<your name>',
    Website: '<your website>',
  },
})
