import Logo from './meta/logo.svg'
import { MyApp } from './src/MyApp'
import { ExtensionInfo } from '../../types'

export const MyExtension: ExtensionInfo = {
  Enabled: false, // leave this as false, we'll enable it after the review process
  Name: '<your app name>',
  Description: '<describe your extension in a few words>',
  Website: '<your app website>',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: [],
  AppRoot: MyApp,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: '<your name>',
    Website: '<your website>',
  },
}
