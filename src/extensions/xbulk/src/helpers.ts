import { shiftBigint } from '@peerme/core-ts'
import { Token, TokenTransfer } from '@multiversx/sdk-core'

export const toPreparedCsvLines = (plainText: string) => plainText.trim().split(/[\r\n]+/)

export const createTokenTransferFromBigInteger = (payment: TokenTransfer, amount: bigint) => {
  const tokenIdentifier = sanitizeTokenIdentifier(payment.tokenIdentifier)
  const token = new Token({ identifier: tokenIdentifier, nonce: BigInt(payment.nonce) })

  return new TokenTransfer({ token, amount })
}

export const createTokenTransferFromAmount = (payment: TokenTransfer, amount: bigint) => {
  const amountAsBigInt = shiftBigint(amount, payment.numDecimals)

  return createTokenTransferFromBigInteger(payment, amountAsBigInt)
}

const sanitizeTokenIdentifier = (tokenIdentifier: string) => {
  const parts = tokenIdentifier.split('-')

  return parts.length === 3 ? parts[0] + '-' + parts[1] : tokenIdentifier
}
