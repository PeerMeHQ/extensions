import { BigNumber } from 'bignumber.js'
import { Constants, toFormattedTokenAmount } from '@peerme/core-ts'

export const toEgldDisplayAmount = (amount: BigNumber) =>
  toFormattedTokenAmount(amount, Constants.EgldDecimals, 4) + ' ' + Constants.EgldTokenIdentifier
