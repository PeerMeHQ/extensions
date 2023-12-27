import { App } from './src/App'
import { Logo } from './meta/Logo'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const StakingExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false, // leave this as false, we'll enable it after the review process
  Name: 'Staking',
  Description: 'Secure the network & earn rewards',
  Website: 'https://multiversx.com',
  Logo: {
    Light: Logo,
    Dark: Logo,
  },
  Tags: [],
  Contracts: {},
  AppRoot: App,
  WidgetRoots: {},
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
