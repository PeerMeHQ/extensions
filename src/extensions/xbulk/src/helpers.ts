import { BigNumber } from 'bignumber.js'
import { TokenPayment } from '@multiversx/sdk-core'

export const toPreparedCsvLines = (plainText: string) => plainText.trim().split(/[\r\n]+/)

export const createTokenPaymentFromBigInteger = (payment: TokenPayment, amount: BigNumber.Value) => {
  const tokenIdentifier = sanitizeTokenIdentifier(payment.tokenIdentifier)

  return new TokenPayment(tokenIdentifier, payment.nonce, amount, payment.numDecimals)
}

export const createTokenPaymentFromAmount = (payment: TokenPayment, amount: BigNumber.Value) => {
  const amountAsBigInteger = new BigNumber(amount).shiftedBy(payment.numDecimals).decimalPlaces(0)

  return createTokenPaymentFromBigInteger(payment, amountAsBigInteger)
}

const sanitizeTokenIdentifier = (tokenIdentifier: string) => {
  const parts = tokenIdentifier.split('-')

  return parts.length === 3 ? parts[0] + '-' + parts[1] : tokenIdentifier
}
