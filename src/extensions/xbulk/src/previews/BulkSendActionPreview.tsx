import React from 'react'
import { BigNumber } from 'bignumber.js'
import { createTokenPayment } from '../helpers'
import { TokenPayment } from '@multiversx/sdk-core'
import { AddressPresenter } from '@peerme/web-ui'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'

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
      <ActionPreviewHighlight className="mb-4">
        send <strong>{nTransactions}</strong> transactions for a total of{' '}
        <strong>{toFormattedTokenPayment(totalPayment)}</strong>.
      </ActionPreviewHighlight>
      <h4 className="mb-2">Transactions:</h4>
      <table className="w-full border-2 border-gray-300 dark:border-gray-700 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 dark:border-gray-700 text-left px-4 py-2 rounded-tl">Receiver</th>
            <th className="border border-gray-300 dark:border-gray-700 text-left px-4 py-2 rounded-tr">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => (
            <tr key={i}>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                <AddressPresenter value={tx.address as string} trim={8} className="mb-0" inline />
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                {toFormattedTokenPayment(tx.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
