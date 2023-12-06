import BigNumber from 'bignumber.js'

export type EsdtPool = {
  id: number
  pool_id: number
  title: string
  stake_token_id: string
  stake_token_decimal: number
  reward_token_id: string
  reward_token_decimal: number
  annual_reward_amount: string
  fee_type: number
  owner: string
  paused: boolean
  pool_paused: boolean
  pool_initial_deposited: boolean
  total_stake_amount: string
  reward_pool_size: string
  staker_count: number
}

export type EsdtPoolOnChain = {
  pool_id: string
  pool_type: string
  owner: string
  paused: boolean
  pool_paused: boolean
  pool_initial_deposited: boolean
  stake_token_id: string
  stake_token_decimal: string
  reward_token_id: string
  reward_token_decimal: string
  annual_reward_amount: string
  total_stake_amount: string
  reward_pool_size: string
  staker_count: string
  user_stake_amount: BigNumber
  user_reward_amount: BigNumber
  lock_time_seconds: string
  locked_until: string
  bonus_token_id: string
  bonus_nonce: string
  bonus_threshold: string
  bonus_once: boolean
  bonus_claimed: boolean
}

export type NftPool = {
  id: number
  pool_id: number
  title: string
  preview: {
    type: string
    data: number[]
  }
  stake_token_id: string
  reward_token_id: string
  reward_token_decimal: number
  daily_reward_amount: string
  fee_type: number
  owner: string
  paused: boolean
  pool_paused: boolean
  pool_initial_deposited: boolean
  total_stake_amount: string
  reward_pool_size: string
  staker_count: number
}

export type NftPoolOnChain = {
  pool_id: string
  pool_type: string
  owner: string
  paused: boolean
  pool_paused: boolean
  pool_initial_deposited: boolean
  stake_token_id: string
  reward_token_id: string
  reward_token_decimal: string
  daily_reward_amount: string
  total_stake_amount: string
  reward_pool_size: string
  staker_count: string
  user_stake_amount: BigNumber
  user_reward_amount: BigNumber
  user_stake_amount_per_nonce: StakedNftInfo[]
  is_paired: boolean
  pair_token_id: string
  stake_capacity_max: string
}

export type StakedNftInfo = {
  nonce: number
  amount: number
}
