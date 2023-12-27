import dayjs from 'dayjs'
import React, { useState } from 'react'
import { CoalitionInfo } from '../types'
import { sanitizeNumeric } from '@peerme/core-ts'
import { Alert, Button, Input } from '@peerme/web-ui'
import daysjsRelative from 'dayjs/plugin/relativeTime'
import { useApp } from '../../../../shared/hooks/useApp'
import { getCoalitionContractAddress } from '../contracts'
import { faWarning } from '@fortawesome/free-solid-svg-icons'
import {
  Address,
  Interaction,
  AddressValue,
  SmartContract,
  TokenTransfer,
  ContractFunction,
  U64Value,
} from '@multiversx/sdk-core/out'

dayjs.extend(daysjsRelative)

type Props = {
  info: CoalitionInfo
  className?: string
}

export function Staker(props: Props) {
  const app = useApp()
  const [stakeAmount, setStakeAmount] = useState('')
  const lockedFor = dayjs().to(dayjs().add(props.info.stakeLockTimeSeconds, 'seconds'), true)
  const stakeTokenDecimals = 18 // TODO

  const handleStake = () => {
    if (!app.config.user) return
    const contract = new SmartContract({ address: Address.fromBech32(getCoalitionContractAddress(app.config.network)) })
    const tx = new Interaction(contract, new ContractFunction('stake'), [
      new AddressValue(Address.fromBech32(app.config.entity.address)),
      new U64Value(0),
    ])
      .withChainID(app.config.walletConfig.ChainId)
      .withSender(new Address(app.config.user.address))
      .withGasLimit(10_000_000)
      .withSingleESDTTransfer(TokenTransfer.fungibleFromAmount(props.info.nativeToken, stakeAmount, stakeTokenDecimals))
      .buildTransaction()
    app.requestUserAction(tx)
  }

  return (
    <div className={props.className}>
      <h2 className="mb-4">
        Stake <span className="text-indigo-500">$</span>
        {props.info.nativeToken.split('-')[0]}
      </h2>
      <label htmlFor="amount" className="mb-2 pl-1 text-xl text-gray-800 dark:text-gray-200">
        Amount
      </label>
      <div className="relative mb-4">
        <Input
          id="amount"
          type="number"
          placeholder="Amount"
          value={stakeAmount}
          onChange={(val) => setStakeAmount(sanitizeNumeric(val))}
          autoFocus
          autoComplete="off"
        />
        {/* {+stakeAmount !== +balanceDenominated && (
          <div className="absolute bottom-1/2 right-4 translate-y-1/2 transform">
            <button
              type="button"
              onClick={() => setStakeAmount(balanceDenominated.toString())}
              className="rounded-xl bg-gray-800 px-3 py-1 uppercase text-gray-100 shadow-lg transition duration-300 hover:bg-gray-900"
            >
              Max
            </button>
          </div>
        )} */}
      </div>
      {/* <p className="mb-4 text-right">Balance: {balanceDenominated.toFormat(4)}</p> */}
      <Alert type="warning" icon={faWarning}>
        Staked tokens will be locked for <strong>{lockedFor}</strong>.
      </Alert>
      <Button onClick={handleStake} color="blue" className="block w-full" disabled={+stakeAmount <= 0}>
        Stake
      </Button>
    </div>
  )
}
