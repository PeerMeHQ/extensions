import { App } from './src/App'
import { Contracts } from './src/contracts'
import { ExtensionConfig, ExtensionInfo } from '../../shared/types'

export const Sense4fitExtension = (config: ExtensionConfig): ExtensionInfo => ({
  Enabled: false,
  Name: 'Sense4FIT',
  Description: 'Fit2Earn Lifestyle app',
  Website: 'https://sense4fit.io',
  Logo: {
    Light: '/images/extensions/sense4fit-logo.png',
    Dark: '/images/extensions/sense4fit-logo.png',
  },
  Tags: [],
  Contracts: Contracts(config),
  AppRoot: App,
  WidgetRoots: {},
  Developer: {
    Name: 'PeerMe',
    Website: 'https://peerme.io',
  },
})
