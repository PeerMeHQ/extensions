import { TokenTransfer } from '@multiversx/sdk-core/out'
import { Button, EntityTransferSelector } from '@peerme/web-ui'
import { address } from '@vleap/warps'
import React, { SyntheticEvent, useState } from 'react'
import { useApp } from '../../../shared/hooks/useApp'
import { AppSection } from '../../../shared/ui/elements/AppSection'
import { EntityContracts } from './contracts'

type Props = {
  className?: string
}

export function BoostSection(props: Props) {
  const app = useApp()
  const [payment, setPayment] = useState<TokenTransfer | null>(null)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!payment || payment.amount === 0n) {
      app.showToast('Can not boost with zero', 'error')
      return
    }

    const value = payment.isEgld() ? payment.amount : 0n
    const tokenTransfers = payment.isEgld() ? [] : [payment]

    app.requestProposalAction(
      EntityContracts(app.config).Boost.Address,
      EntityContracts(app.config).Boost.Endpoint,
      value,
      [address(app.config.entity.address)],
      tokenTransfers
    )
  }

  return (
    <AppSection
      title="Boost from Vault"
      description={`Boost ${app.config.entity.name} now with funds from the vault to enable extra features.`}
      className={props.className}
    >
      <form onSubmit={handleSubmit}>
        <EntityTransferSelector
          network={app.config.network}
          entity={app.config.entity}
          permissions={[]}
          onSelected={(val) => setPayment(val)}
          className="mb-8"
        />
        <Button color="blue" className="block w-full" disabled={!payment} type="submit">
          Boost now
        </Button>
      </form>
    </AppSection>
  )
}
