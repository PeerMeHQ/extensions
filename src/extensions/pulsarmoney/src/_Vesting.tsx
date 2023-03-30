import { TokenPayment } from '@multiversx/sdk-core/out/tokenPayment'
import { Button, Input, PaymentSelector, Switch, UserSelector, Dropdown, DropdownOption } from '@peerme/web-ui'
import React, { SyntheticEvent, useState } from 'react'
import { currentTimestamp, INITIAL_CLIFF, INITIAL_END, MAX_NAME_LENGTH, options } from './utils'
import * as sdk from './sdk'
import { TransactionDecoder } from '@elrondnetwork/transaction-decoder'
import BigNumber from 'bignumber.js'
import { BytesValue } from '@multiversx/sdk-core/out'
import { useApp } from '../../../shared/hooks/useApp'

export const _Vesting = () => {
  const app = useApp()

  const [receiver, setReceiver] = useState('')
  const [tokenPayment, setTokenPayment] = useState<TokenPayment | null>(null)
  const [cliffAmount, setCliffAmount] = useState('')

  const [cliffDate, setCliffDate] = useState(INITIAL_CLIFF)
  const [endDate, setEndDate] = useState(INITIAL_END)

  const [frequencyOption, setFrequencyOption] = useState<DropdownOption>(options[0])

  const [cancellable, setCancellable] = useState(false)
  const [name, setName] = useState('')

  const isSubmitDisabled = !receiver || !tokenPayment || !cliffDate || !endDate || !cliffAmount

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const address = app?.config?.entity?.address

    if (!tokenPayment) return
    if (!address) return
    if (!receiver) return

    const cliffTimestampInMiliseconds = new Date(cliffDate).getTime()
    const endTimestampInMiliseconds = new Date(endDate).getTime()
    const totalAmount = +tokenPayment.amountAsBigInteger.dividedBy(10 ** tokenPayment.numDecimals).toString()

    if (cliffTimestampInMiliseconds < currentTimestamp) {
      app.showToast('Cliff date must be set to the future', 'error')
      return
    }

    if (endTimestampInMiliseconds < currentTimestamp) {
      app.showToast('End date must be set to the future', 'error')
      return
    }

    if (endTimestampInMiliseconds < cliffTimestampInMiliseconds) {
      app.showToast('End date must be set after the cliff date', 'error')
      return
    }

    if (name.length > MAX_NAME_LENGTH) {
      app.showToast(`Name must not have more than ${MAX_NAME_LENGTH} characters`, 'error')
      return
    }

    if (totalAmount <= +cliffAmount) {
      app.showToast('Total amount must be greater than the cliff amount', 'error')
      return
    }

    if (totalAmount < 0 || +cliffAmount < 0) {
      app.showToast('Amounts must be greater than 0', 'error')
      return
    }

    const transaction = await sdk.createVesting(
      address,
      [receiver],
      totalAmount,
      cliffTimestampInMiliseconds,
      +cliffAmount,
      endTimestampInMiliseconds,
      +frequencyOption.identifier,
      cancellable,
      tokenPayment.tokenIdentifier,
      name
    )

    const metadata = new TransactionDecoder().getTransactionMetadata(transaction)
    const value = tokenPayment.isEgld() ? new BigNumber(metadata.value.toString()) : new BigNumber(0)

    let payments: TokenPayment[] = []

    if (!tokenPayment.isEgld()) {
      if (!metadata || !metadata.transfers || !metadata.transfers[0]) return

      const token = new TokenPayment(
        tokenPayment.tokenIdentifier,
        tokenPayment.nonce,
        new BigNumber(metadata.transfers[0].value.toString()),
        tokenPayment.numDecimals
      )

      payments.push(token)
    }

    app.requestProposalAction(
      metadata.receiver,
      metadata.functionName || '',
      value,
      metadata.functionArgs.map((arg) => BytesValue.fromHex(arg)) || [],
      payments
    )
  }
  return (
    <form onSubmit={handleSubmit}>
      <PaymentSelector
        config={app.config.walletConfig}
        entity={app.config.entity}
        permissions={[]}
        onSelected={(val) => setTokenPayment(val)}
        className="mb-8"
      />

      <UserSelector
        searchConfig={app.config.searchConfig}
        placeholder="Recipient address ..."
        onSelect={(val) => setReceiver(val.address)}
        className="mb-8"
      />

      <div className="mb-4">
        <label htmlFor="cliff_date" className="pl-1 text-xl mb-2 text-gray-800 dark:text-gray-200">
          Cliff date
        </label>
        <Input
          id="cliff_date"
          type="datetime-local"
          placeholder="Cliff date ..."
          value={cliffDate}
          onChange={(val) => setCliffDate(val)}
          required
        />
        <small className="block mt-2 pl-2 text-yellow-500 text-sm mb-2">
          The proposal must be executed before the start date or it will fail.
        </small>
        <Input
          id="release_cliff"
          type="number"
          value={cliffAmount}
          onChange={(val) => {
            setCliffAmount(val)
          }}
          required
          placeholder="Release amount at cliff "
        />
      </div>
      <div className="mb-4">
        <label htmlFor="ending_date" className="pl-1 text-xl mb-2 text-gray-800 dark:text-gray-200">
          Ends at (your local time)
        </label>
        <Input
          id="ending_date"
          type="datetime-local"
          placeholder="Ends at ..."
          value={endDate}
          onChange={(val) => setEndDate(val)}
          required
        />
      </div>
      <div className="mb-4">
        <div className="flex items-center space-x-4  mb-4">
          <Switch label="Cancellable" checked={cancellable} onChange={(val) => setCancellable(val)} />
          <span className="text-xl wrap text-gray-700 dark:text-gray-200">Can cancel?</span>
        </div>
        <div>
          <Input value={name} onChange={(val) => setName(val)} placeholder="Vesting name" />
        </div>
      </div>
      <div className="mb-4 flex items-center space-x-4 ">
        <label className="pl-1 text-xl mb-2 text-gray-800 dark:text-gray-200">Frequency</label>
        <Dropdown
          multiple={false}
          onChange={(val) => setFrequencyOption(val)}
          options={options}
          value={frequencyOption}
        />
      </div>

      <Button color="blue" className="block w-full" disabled={isSubmitDisabled} submit>
        Create Vesting
      </Button>
    </form>
  )
}
