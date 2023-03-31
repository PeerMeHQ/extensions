import { BigNumber } from 'bignumber.js'
import { TokenPayment } from '@multiversx/sdk-core'

export const createTokenPayment = (payment: TokenPayment, amount: string | BigNumber) => {
  const newAmount =
    amount instanceof BigNumber ? amount : new BigNumber(amount).shiftedBy(payment.numDecimals).decimalPlaces(0)

  return new TokenPayment(payment.tokenIdentifier, payment.nonce, newAmount, payment.numDecimals)
}
