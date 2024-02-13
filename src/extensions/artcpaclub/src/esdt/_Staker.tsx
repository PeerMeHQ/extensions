import { EsdtPool } from '../types'
import { Contracts } from '../contracts'
import React, { SyntheticEvent, useState } from 'react'
import { TokenTransfer } from '@multiversx/sdk-core/out'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'
import { Button, EntityTransferSelector } from '@peerme/web-ui'

type Props = {
  pool: EsdtPool
  className?: string
}

export function _Staker(props: Props) {
  const app = useApp()
  const [payment, setPayment] = useState<TokenTransfer | null>(null)
  const isSubmitDisabled = !payment || payment.amountAsBigInteger.isZero()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!payment) return
    const value = payment.isEgld() ? payment.amountAsBigInteger : 0
    const tokenTransfers = payment.isEgld() ? [] : [payment]

    app.requestProposalAction(
      Contracts(app.config).EsdtUserStake.Address,
      Contracts(app.config).EsdtUserStake.Endpoint,
      value,
      [props.pool.pool_id],
      tokenTransfers
    )
  }

  return (
    <AppSection title="Stake now" className={props.className}>
      <form onSubmit={handleSubmit}>
        <EntityTransferSelector
          config={app.config.walletConfig}
          entity={app.config.entity}
          permissions={[{ name: '*', value: '0', destination: '', endpoint: '', arguments: [], payments: [] }]}
          onSelected={(val) => setPayment(val)}
          tokenIdWhitelist={['EGLD', props.pool.stake_token_id]}
          className="mb-8"
        />
        <Button color="blue" className="block w-full" disabled={isSubmitDisabled} type="submit">
          Add Stake Action
        </Button>
      </form>
    </AppSection>
  )
}
