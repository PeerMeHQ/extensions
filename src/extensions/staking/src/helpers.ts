import { BigNumber } from 'bignumber.js'
import { Constants, toFormattedTokenAmount } from '@peerme/core-ts'

export const toEgldDisplayAmount = (amount: BigNumber.Value) =>
  toFormattedTokenAmount(amount, 4, Constants.EgldDecimals) + ' ' + Constants.EgldTokenIdentifier
