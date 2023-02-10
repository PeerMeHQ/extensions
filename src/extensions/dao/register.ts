import { DaoApp } from './src/DaoApp'
import { ExtensionInfo } from '../../types'
import LogoBlack from './meta/logo-black.svg'
import LogoWhite from './meta/logo-white.svg'

export const DaoExtension: ExtensionInfo = {
  Enabled: false,
  Name: 'Configure :entityName',
  Description: 'Configure your DAO on peerme.io',
  Website: 'https://peerme.io',
  Logo: {
    Light: LogoBlack,
    Dark: LogoWhite,
  },
  Tags: [],
  AppRoot: DaoApp,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
}
