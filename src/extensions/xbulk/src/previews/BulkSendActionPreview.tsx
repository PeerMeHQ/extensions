import { TokenTransfer } from '@multiversx/sdk-core'
import {
  ProposalAction,
  toFormattedTokenPayment,
  toTokenPaymentFromProposalPayment,
  transformActionArgToBigint,
} from '@peerme/core-ts'
import { AddressPresenter } from '@peerme/web-ui'
import React from 'react'
import { useApp } from '../../../../shared/hooks/useApp'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { createTokenTransferFromBigInteger } from '../helpers'

type Props = {
  action: ProposalAction
}

export const BulkSendActionPreview = (props: Props) => {
  const app = useApp()
  //get all the arguments (addresses of the receivers and amounts)
  const args = props.action.arguments
  const nTransactions = args.length / 2

  //get the transaction payment
  const totalPayment =
    props.action.payments.length > 0
      ? toTokenPaymentFromProposalPayment(props.action.payments[0])
      : TokenTransfer.egldFromBigInteger(props.action.value.toString())

  //create an array of transactions
  let transactions = []
  for (let i = 0; i < args.length; i += 2) {
    transactions.push({
      address: args[i],
      amount: createTokenTransferFromBigInteger(totalPayment, transformActionArgToBigint(args[i + 1]) as any), // 'any' needed because of multiple BigNumber resolutions
    })
  }

  return (
    <>
      <ActionPreviewHighlight>
        send <strong>{nTransactions}</strong> transactions for a total of{' '}
        <strong>{toFormattedTokenPayment(totalPayment)}</strong>.
      </ActionPreviewHighlight>
      <section className="mt-4">
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
                  <AddressPresenter
                    network={app.config.network}
                    value={tx.address as string}
                    trim={8}
                    className="mb-0"
                    inline
                  />
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  {toFormattedTokenPayment(tx.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}
