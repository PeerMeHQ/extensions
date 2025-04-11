import { TokenTransfer } from '@multiversx/sdk-core/out'
import { Button, EntityTransferSelector } from '@peerme/web-ui'
import { u64 } from '@vleap/warps'
import React, { SyntheticEvent, useState } from 'react'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'
import { Contracts } from '../contracts'
import { NftPool } from '../types'

type Props = {
  pool: NftPool
  className?: string
}

export function _Staker(props: Props) {
  const app = useApp()
  const [payment, setPayment] = useState<TokenTransfer | null>(null)
  const isSubmitDisabled = !payment || payment.amountAsBigInteger.isZero()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!payment) return
    const value = payment.isEgld() ? payment.amount : 0n
    const tokenTransfers = payment.isEgld() ? [] : [payment]

    app.requestProposalAction(
      Contracts(app.config).NftUserStake.Address,
      Contracts(app.config).NftUserStake.Endpoint,
      value,
      [u64(BigInt(props.pool.pool_id))],
      tokenTransfers
    )
  }

  return (
    <AppSection title="Stake now" className={props.className}>
      <form onSubmit={handleSubmit}>
        <EntityTransferSelector
          network={app.config.network}
          entity={app.config.entity}
          permissions={[]}
          onSelected={(val) => setPayment(val)}
          tokenIdWhitelist={['egld', props.pool.stake_token_id]}
          className="mb-8"
        />
        <Button color="blue" className="block w-full" disabled={isSubmitDisabled} type="submit">
          Add Stake Action
        </Button>
      </form>
    </AppSection>
  )
}
