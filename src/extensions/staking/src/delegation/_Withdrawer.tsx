import { Config } from '../config'
import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import { Button, Input } from '@peerme/web-ui'
import { toEgldDisplayAmount } from '../helpers'
import { AppHook } from '../../../../shared/hooks/useApp'
import { Constants, sanitizeNumeric } from '@peerme/core-ts'
import { DelegationInfo, DelegationProvider } from '../types'

type Props = {
  app: AppHook
  provider: DelegationProvider
  delegation: DelegationInfo
}

export const _Withdrawer = (props: Props) => {
  const [amount, setAmount] = useState('')

  const handleWithdraw = () => {
    const valueBig = new BigNumber(amount).shiftedBy(Constants.EgldDecimals)
    if (valueBig.isGreaterThan(props.delegation.userActiveStake)) {
      props.app.showToast('Can not unstake more than is staked', 'error')
      return
    }
    props.app.requestProposalAction(props.provider.contract, Config.Endpoints.UnDelegate, 0, [valueBig], [])
  }

  return (
    <div className="relative pt-2">
      <h2 className="sr-only">Withdraw from</h2>
      <a
        href={props.provider.identity.url}
        target="_blank"
        rel="noopener"
        className="flex px-6 py-3 bg-gray-200 dark:bg-gray-900 rounded-xl mb-4"
      >
        <div className="flex items-center">
          <img
            src={props.provider.identity.avatar}
            alt={props.provider.identity.name + ' Staking Provider Avatar'}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-4"
          />
        </div>
        <div className="flex-grow text-left">
          <h3 className="text-lg text-black dark:text-white">{props.provider.identity.name}</h3>
          <span className="text-sm text-gray-500">{props.provider.identity.url}</span>
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
        {+amount !== props.delegation.userActiveStake.shiftedBy(-Constants.EgldDecimals).toNumber() && (
          <div className="absolute bottom-1/2 right-4 transform translate-y-1/2">
            <button
              type="button"
              onClick={() => setAmount(props.delegation.userActiveStake.shiftedBy(-Constants.EgldDecimals).toString())}
              className="px-3 py-1 uppercase bg-gray-800 hover:bg-gray-900 text-gray-100 rounded-xl shadow-lg transition duration-300"
            >
              Max
            </button>
          </div>
        )}
      </div>
      <p className="text-right mb-4">Balance: {toEgldDisplayAmount(props.delegation.userActiveStake)}</p>
      <Button onClick={handleWithdraw} color="blue" disabled={+amount <= 0} className="block w-full">
        Add Unstake Action to Proposal
      </Button>
    </div>
  )
}
