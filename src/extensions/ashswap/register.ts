import { App } from './src/App'
import { Contracts } from './src/contracts'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const AshSwapExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false, // leave this as false, we'll enable it after the review process
  Name: 'AshSwap',
  Description: 'The first stable-swap on MultiversX',
  Website: 'https://ashswap.io/',
  Logo: {
    Light: '/images/extensions/ashswap-logo.png',
    Dark: '/images/extensions/ashswap-logo.png',
  },
  Tags: [],
  Contracts: Contracts(config),
  AppRoot: App,
  WidgetRoots: {
    Info: null,
  },
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
