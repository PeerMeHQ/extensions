import { Address } from '@multiversx/sdk-core'
import { Constants, sanitizeNumeric, shiftedBy } from '@peerme/core-ts'
import { Button, Input } from '@peerme/web-ui'
import React, { useEffect, useState } from 'react'
import { useApp } from '../../../../shared/hooks/useApp'
import { Config } from '../config'
import { toEgldDisplayAmount } from '../helpers'
import { DelegationProvider } from '../types'

type Props = {
  provider: DelegationProvider
}

export const _Delegator = (props: Props) => {
  const app = useApp()
  const [entityBalance, setEntityBalance] = useState<bigint>(0n)
  const [amount, setAmount] = useState('0')
  const amountBig = shiftedBy(amount, Constants.Egld.Decimals)

  useEffect(() => {
    app.networkProvider
      .getAccount(new Address(app.config.entity.address))
      .then((acc) => setEntityBalance(BigInt(acc.balance?.toString() || 0)))
  }, [])

  const handleAdd = () => {
    if (amountBig > entityBalance) {
      app.showToast('Insufficient balance', 'error')
      return
    }
    app.requestProposalAction(props.provider.contract, Config.Endpoints.Delegate, amountBig, [], [])
  }

  return (
    <div className="relative pt-2">
      <h2 className="sr-only">Stake with {props.provider.identityInfo.name}</h2>
      <a
        href={props.provider.identityInfo.website}
        target="_blank"
        rel="noopener"
        className="flex px-6 py-3 bg-gray-200 dark:bg-gray-900 rounded-xl mb-4"
      >
        <div className="flex items-center">
          <img
            src={props.provider.identityInfo.avatar}
            alt={props.provider.identityInfo.name + ' Staking Provider Avatar'}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-4"
          />
        </div>
        <div className="flex-grow text-left">
          <h3 className="text-lg text-black dark:text-white">{props.provider.identityInfo.name}</h3>
          <span className="text-sm text-gray-500">{props.provider.identityInfo.website}</span>
        </div>
      </a>
      <label htmlFor="amount" className="pl-1 text-xl mb-2 text-gray-800 dark:text-gray-200">
        Stake Amount
      </label>
      <div className="relative">
        <Input
          id="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(val) => setAmount(sanitizeNumeric(val))}
          className="mb-2"
          autoFocus
          autoComplete="off"
        />
        {amountBig !== entityBalance && (
          <div className="absolute bottom-1/2 right-4 transform translate-y-1/2">
            <button
              type="button"
              onClick={() => setAmount(shiftedBy(entityBalance, -Constants.Egld.Decimals).toString())}
              className="px-3 py-1 uppercase bg-gray-800 hover:bg-gray-900 text-gray-100 rounded-xl shadow-lg transition duration-300"
            >
              Max
            </button>
          </div>
        )}
      </div>
      <p className="text-right mb-4">Balance: {toEgldDisplayAmount(entityBalance)}</p>
      <Button onClick={handleAdd} color="blue" disabled={+amount <= 0} className="block w-full">
        Add Stake Action to Proposal
      </Button>
    </div>
  )
}
