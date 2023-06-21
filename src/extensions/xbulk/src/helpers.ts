import { BigNumber } from 'bignumber.js'
import { TokenTransfer } from '@multiversx/sdk-core'

export const toPreparedCsvLines = (plainText: string) => plainText.trim().split(/[\r\n]+/)

export const createTokenTransferFromBigInteger = (payment: TokenTransfer, amount: BigNumber.Value) => {
  const tokenIdentifier = sanitizeTokenIdentifier(payment.tokenIdentifier)

  return TokenTransfer.metaEsdtFromBigInteger(tokenIdentifier, payment.nonce, amount, payment.numDecimals)
}

export const createTokenTransferFromAmount = (payment: TokenTransfer, amount: BigNumber.Value) => {
  const amountAsBigInteger = new BigNumber(amount).shiftedBy(payment.numDecimals).decimalPlaces(0)

  return createTokenTransferFromBigInteger(payment, amountAsBigInteger)
}

const sanitizeTokenIdentifier = (tokenIdentifier: string) => {
  const parts = tokenIdentifier.split('-')

  return parts.length === 3 ? parts[0] + '-' + parts[1] : tokenIdentifier
}
