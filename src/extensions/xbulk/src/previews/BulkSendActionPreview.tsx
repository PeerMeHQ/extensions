import React from 'react'
import { TokenPayment } from '@multiversx/sdk-core'
import { AddressPresenter } from '@peerme/web-ui'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'

type Props = {
  action: ProposalAction
}

export const BulkSendActionPreview = (props: Props) => {
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

  //get all the arguments (addresses of the receivers and amounts)
  const args = props.action.arguments
  const nTransactions = args.length / 2

  //get the transaction payment
  const totalPayment =
    props.action.payments.length > 0
      ? toTokenPaymentFromProposalPayment(props.action.payments[0])
      : TokenPayment.egldFromBigInteger(props.action.value)

  //create an array of transactions
  let transactions = []
  for (let i = 0; i < args.length; i += 2) {
    transactions.push({ address: args[i], amount: createTokenPayment(args[i + 1]) })
  }

  return (
    <>
      send <strong>{nTransactions}</strong> transactions for a total of{' '}
      <strong>{toFormattedTokenPayment(totalPayment)}</strong>.<br />
      <strong>Transactions:</strong>
      <br />
      {transactions.map((transaction) => {
        return (
          <>
            <br />
            <AddressPresenter value={transaction.address?.toString() || ''} trim={5} inline /> -{' '}
            {toFormattedTokenPayment(transaction.amount)}
          </>
        )
      })}
    </>
  )
}
