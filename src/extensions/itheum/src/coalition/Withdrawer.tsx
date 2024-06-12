import dayjs from 'dayjs'
import React, { useState } from 'react'
import { CoalitionInfo } from '../types'
import { sanitizeNumeric, shiftBigint } from '@peerme/core-ts'
import { Alert, Button, Input } from '@peerme/web-ui'
import daysjsRelative from 'dayjs/plugin/relativeTime'
import { useApp } from '../../../../shared/hooks/useApp'
import { getCoalitionContractAddress } from '../contracts'
import { faHourglass } from '@fortawesome/free-solid-svg-icons'
import { Address, U64Value, Interaction, AddressValue, SmartContract, ContractFunction } from '@multiversx/sdk-core/out'

dayjs.extend(daysjsRelative)

type Props = {
  info: CoalitionInfo
  className?: string
}

export function Withdrawer(props: Props) {
  const app = useApp()
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const lockedUntilDate = dayjs.unix(props.info.userStakeUnlocksAt)
  const isLocked = dayjs().isBefore(lockedUntilDate)
  const stakeTokenDecimals = 18 // TODO
  const balanceDenominated = shiftBigint(props.info.userStake, -stakeTokenDecimals)

  const handleWithdraw = () => {
    if (!app.config.user) return
    const amount = shiftBigint(withdrawAmount, stakeTokenDecimals)
    const contract = new SmartContract({ address: Address.fromBech32(getCoalitionContractAddress(app.config.env)) })
    const tx = new Interaction(contract, new ContractFunction('unstake'), [
      new AddressValue(Address.fromBech32(app.config.entity.address)),
      new U64Value(amount),
    ])
      .withChainID(app.config.network.chainId)
      .withSender(new Address(app.config.user.address))
      .withGasLimit(10_000_000)
      .buildTransaction()
    app.requestUserAction(tx)
  }

  return (
    <div className={props.className}>
      <h2 className="mb-4">
        Stake <span className="text-indigo-500">$</span>
        {props.info.nativeToken.split('-')[0]}
      </h2>
      {isLocked && (
        <Alert type="warning" icon={faHourglass}>
          Stake unlocks <strong>{dayjs().to(lockedUntilDate)}</strong>.
        </Alert>
      )}
      <label htmlFor="amount" className="mb-2 pl-1 text-xl text-gray-800 dark:text-gray-200">
        Amount
      </label>
      <div className="relative mb-4">
        <Input
          id="amount"
          type="number"
          placeholder="Amount"
          value={withdrawAmount}
          onChange={(val) => setWithdrawAmount(sanitizeNumeric(val))}
          autoFocus
          autoComplete="off"
        />
        {BigInt(withdrawAmount) !== balanceDenominated && (
          <div className="absolute bottom-1/2 right-4 translate-y-1/2 transform">
            <button
              type="button"
              onClick={() => setWithdrawAmount(balanceDenominated.toString())}
              className="rounded-xl bg-gray-800 px-3 py-1 uppercase text-gray-100 shadow-lg transition duration-300 hover:bg-gray-900"
            >
              Max
            </button>
          </div>
        )}
      </div>
      <p className="mb-4 text-right">Balance: TODO</p>
      <Button
        onClick={handleWithdraw}
        color="blue"
        className="block w-full"
        disabled={+withdrawAmount <= 0 || isLocked}
      >
        Withdraw
      </Button>
    </div>
  )
}
