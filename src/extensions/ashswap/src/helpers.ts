import { AppEnv } from '../../../shared/types'
import { ChainId } from '@ashswap/ash-sdk-js/out'

export const getAshswapChainId = (network: AppEnv): ChainId.Devnet | ChainId.Mainnet => {
  if (network === 'devnet') return ChainId.Devnet
  return ChainId.Mainnet
}
