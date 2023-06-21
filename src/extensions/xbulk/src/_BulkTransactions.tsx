import { Config } from './config'
import { Contracts } from './contracts'
import { BigNumber } from 'bignumber.js'
import { useDebounce } from '@peerme/core-ts'
import { useApp } from '../../../shared/hooks/useApp'
import { TokenTransfer, Address } from '@multiversx/sdk-core'
import React, { SyntheticEvent, useMemo, useState } from 'react'
import { Button, Switch, Textarea, showToast, PaymentSelector, FileSelector, Alert } from '@peerme/web-ui'
import { createTokenTransferFromAmount, createTokenTransferFromBigInteger, toPreparedCsvLines } from './helpers'

export const _BulkTransactions = () => {
  const app = useApp()
  const [transfer, setTransfer] = useState<TokenTransfer | null>(null)
  const [userTxList, setUserTxList] = useState<string>('')
  const [useSameAmount, setUseSameAmount] = useState<boolean>(false)

  const debouncedUserTxList = useDebounce(userTxList, 500)

  const preparedLines = useMemo(() => toPreparedCsvLines(debouncedUserTxList), [debouncedUserTxList])

  const isValidInput = useMemo(() => {
    if (!userTxList.length) return false
    if (preparedLines.length > Config.MaxTransactionAmount) return false
    return true
  }, [preparedLines])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (transfer === null) {
      showToast('Please select a token', 'error')
      return
    }

    let errors = ''

    // Prepare the arguments for the transaction
    let callAmount = new BigNumber(0)
    let args = Array<any>()

    preparedLines.forEach((line, i) => {
      try {
        const [receiver, amount] = line.split(Config.PrimaryCsvDelimiter)

        // Check if the address and amount are valid
        const address = Address.fromBech32(receiver)
        if (!useSameAmount && isNaN(Number(amount))) {
          throw Error(`"${amount}" is not a valid number`)
        }

        const tp = useSameAmount ? transfer : createTokenTransferFromAmount(transfer, amount)
        callAmount = callAmount.plus(tp.amountAsBigInteger)

        // Add the transaction to the list
        args.push(address.bech32())
        if (!useSameAmount) {
          args.push(tp.amountAsBigInteger)
        }
      } catch (error: any) {
        errors += `Line ${i + 1}: ${error.message}\n`
      }
    })

    // Stop if there are errors
    if (errors) {
      showToast(errors, 'error')
      return
    }

    const value = transfer.isEgld() ? callAmount : 0
    const tokenPayments = transfer.isEgld() ? [] : [createTokenTransferFromBigInteger(transfer, callAmount)]
    const contract = useSameAmount ? Contracts(app.config).BulkSendSameAmount : Contracts(app.config).BulkSend

    app.requestProposalAction(contract.Address, contract.Endpoint, value, args, tokenPayments)
  }

  const handleCsvSelect = (files: File[]) => {
    if (files.length === 0) return
    const reader = new FileReader()
    reader.onload = function (e) {
      if (!e.target?.result) return
      setUserTxList(e.target.result as string)
    }
    reader.readAsText(files[0])
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-4 py-4 mb-4">
        <Switch
          label="Use the same amount for each transaction"
          checked={useSameAmount}
          onChange={(val) => setUseSameAmount(val)}
        />
        <span className="text-xl text-gray-700 dark:text-gray-200">Use the same amount for each transaction</span>
      </div>

      <label htmlFor="recipient" className="text-xl text-gray-700 dark:text-gray-200">
        {useSameAmount ? 'Select the token and amount you want to send:' : 'Select the token you want to send:'}
      </label>
      <PaymentSelector
        config={app.config.walletConfig}
        entity={app.config.entity}
        permissions={[]}
        onSelected={
          (val) =>
            setTransfer(
              val as any
            ) /** TODO: "as any" because npm resolves to different versions: https://github.com/multiversx/mx-sdk-js-core/issues/290 */
        }
        className="mb-4 mt-2"
        skipTokenTypes={['nft']}
        skipAmount={!useSameAmount}
      />

      <label htmlFor="transactions" className="text-xl text-gray-700 dark:text-gray-200 mb-4">
        Enter the list of the transactions (max 100):
      </label>
      <Textarea
        placeholder={'address' + (useSameAmount ? '' : ';amount')}
        className="mb-4 mt-2"
        style={{ height: '180px' }}
        value={userTxList}
        onChange={(val) => setUserTxList(val)}
      />

      <FileSelector accept={{ 'text/*': ['.csv'] }} onSelect={handleCsvSelect} className="mb-8" />

      {preparedLines.length > Config.MaxTransactionAmount && (
        <Alert type="warning">
          The transaction amount must not exceed <strong>{Config.MaxTransactionAmount}</strong>, which is a blockchain
          limit.
        </Alert>
      )}
      <Button color="blue" className="block w-full" disabled={!isValidInput} submit>
        Add Bulk transaction
      </Button>
    </form>
  )
}
