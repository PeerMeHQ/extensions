import { ChainId } from '@ashswap/ash-sdk-js/out'
import { AppEnv } from '@peerme/core-ts'

export const getAshswapChainId = (network: AppEnv): ChainId.Devnet | ChainId.Mainnet => {
  if (network === 'devnet') return ChainId.Devnet
  return ChainId.Mainnet
}
