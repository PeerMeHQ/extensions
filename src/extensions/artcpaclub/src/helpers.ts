import BigNumber from 'bignumber.js'
import { EsdtPoolOnChain, NftPoolOnChain } from './types'

export const toTypedEsdtPoolOnChain = (value: any): EsdtPoolOnChain => ({
  user_stake_amount: new BigNumber(value.user_stake_amount),
  user_reward_amount: new BigNumber(value.user_reward_amount),
  ...value,
})

export const toTypedNftPoolOnChain = (value: any): NftPoolOnChain => ({
  user_stake_amount: new BigNumber(value.user_stake_amount),
  user_reward_amount: new BigNumber(value.user_reward_amount),
  ...value,
})
