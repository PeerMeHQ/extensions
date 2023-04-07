import { BigNumber } from 'bignumber.js'
import { isBigNumber } from '@peerme/core-ts'
import { TokenPayment } from '@multiversx/sdk-core'

export const toPreparedCsvLines = (plainText: string) => plainText.trim().split(/[\r\n]+/)

export const createTokenPayment = (payment: TokenPayment, amount: string | BigNumber) => {
  const newAmount = isBigNumber(amount) ? amount : new BigNumber(amount).shiftedBy(payment.numDecimals).decimalPlaces(0)

  let tokenIdentifier = payment.tokenIdentifier
  if (tokenIdentifier.split('-').length === 3) {
    tokenIdentifier = tokenIdentifier.split('-')[0] + '-' + tokenIdentifier.split('-')[1]
  }

  return new TokenPayment(tokenIdentifier, payment.nonce, newAmount, payment.numDecimals)
}
