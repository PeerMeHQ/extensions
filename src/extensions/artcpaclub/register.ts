import { App } from './src/App'
import { Contracts } from './src/contracts'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const ArtCpaClubExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false, // leave this as false, we'll enable it after the review process
  Name: 'ArtCPAClub',
  Description: 'NFT Staking & ESDT Staking Platform',
  Website: 'https://marketplace.artcpaclub.com',
  Logo: {
    Light: '/images/extensions/artcpaclub-logo.png',
    Dark: '/images/extensions/artcpaclub-logo.png',
  },
  Tags: [],
  Contracts: Contracts(config),
  AppRoot: App,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'ArtCPAClub',
    Website: 'https://artcpaclub.com/',
  },
})
