import React from 'react'
import { BigNumber } from 'bignumber.js'
import { TokenPayment } from '@multiversx/sdk-core'
import { AddressPresenter } from '@peerme/web-ui'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'
import { createTokenPayment } from './../Helpers'

type Props = {
  action: ProposalAction
}

export const BulkSendActionPreview = (props: Props) => {
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
    transactions.push({
      address: args[i],
      amount: createTokenPayment(totalPayment, new BigNumber(args[i + 1] as string)),
    })
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
