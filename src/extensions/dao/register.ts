import { DaoApp } from './src/DaoApp'
import LogoBlack from './meta/logo-black.svg'
import LogoWhite from './meta/logo-white.svg'
import { ExtensionConfig, ExtensionInfo } from '../_shared/types'

export const DaoExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false,
  Name: 'Configure :entityName',
  Description: 'Configure your DAO on peerme.io',
  Website: 'https://peerme.io',
  Logo: {
    Light: LogoBlack,
    Dark: LogoWhite,
  },
  Tags: [],
  Contracts: {},
  AppRoot: DaoApp,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
