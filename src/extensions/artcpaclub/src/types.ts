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
