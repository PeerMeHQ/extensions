import React from 'react'
import { TokenPayment } from '@multiversx/sdk-core'
import { AddressPresenter, Tooltip } from '@peerme/web-ui'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'

type Props = {
  action: ProposalAction
}

export const BulkSendSameAmountActionPreview = (props: Props) => {
  const createTokenPayment = (amount: BigNumber) => {
    if (totalPayment.isEgld()) {
      return TokenPayment.egldFromBigInteger(amount)
    }
    if (totalPayment.isFungible()) {
      return TokenPayment.fungibleFromBigInteger(totalPayment.tokenIdentifier, amount, totalPayment.numDecimals)
    }
    const tokenIdentifier =
      totalPayment.tokenIdentifier.split('-')[0] + '-' + totalPayment.tokenIdentifier.split('-')[1]
    return TokenPayment.metaEsdtFromBigInteger(tokenIdentifier, totalPayment.nonce, amount, totalPayment.numDecimals)
  }

  //get all the arguments (addresses of the receivers)
  const args = props.action.arguments
  const nTransactions = args.length

  //get the transaction payment
  const totalPayment =
    props.action.payments.length > 0
      ? toTokenPaymentFromProposalPayment(props.action.payments[0])
      : TokenPayment.egldFromBigInteger(props.action.value)

  //calculate the amount to send to each address
  const singleAmount = createTokenPayment(totalPayment.amountAsBigInteger.div(nTransactions))

  return (
    <>
      send a total of <strong>{toFormattedTokenPayment(totalPayment)}</strong> to <strong>{nTransactions}</strong>{' '}
      addresses.
      <br />
      Send {toFormattedTokenPayment(singleAmount)} each to:
      <br />
      <br />
      {args.map((arg) => {
        return <AddressPresenter value={arg?.toString() || ''} trim={5} />
      })}
    </>
  )
}
