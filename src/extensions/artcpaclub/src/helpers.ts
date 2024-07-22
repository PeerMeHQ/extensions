import { EsdtPoolOnChain, NftPoolOnChain } from './types'

export const toTypedEsdtPoolOnChain = (value: any): EsdtPoolOnChain => ({
  ...value,
  user_stake_amount: BigInt(value.user_stake_amount),
  user_reward_amount: BigInt(value.user_reward_amount),
})

export const toTypedNftPoolOnChain = (value: any): NftPoolOnChain => ({
  ...value,
  user_stake_amount: BigInt(value.user_stake_amount),
  user_reward_amount: BigInt(value.user_reward_amount),
  user_stake_amount_per_nonce: value.user_stake_amount_per_nonce.map((v: any) => ({
    amount: v.amount.toNumber(),
    nonce: v.nonce.toNumber(),
  })),
})
