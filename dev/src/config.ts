import { AppEnv, EntityTag } from '@peerme/core-ts'

export const DevServerConfig = {
  Network: 'devnet' as AppEnv,

  WalletConnectProjectId: '9b1a9564f91cb659ffe21b73d5c4e2d8',

  ExplorerUrl: 'https://devnet-explorer.multiversx.com',

  ChainId: 'D',

  AvailableEntityTags: ['defi', 'gaming', 'art', 'itheum'] as EntityTag[],
}
