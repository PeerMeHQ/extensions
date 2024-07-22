import { Constants, toFormattedTokenAmount } from '@peerme/core-ts'

export const toEgldDisplayAmount = (amount: bigint) =>
  toFormattedTokenAmount(amount, Constants.Egld.Decimals, 4) + ' ' + Constants.Egld.DisplayName
