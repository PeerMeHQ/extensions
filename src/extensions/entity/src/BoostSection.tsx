import { EntityConfig } from './config'
import { Constants } from '@peerme/core-ts'
import { EntityContracts } from './contracts'
import { useApp } from '../../../shared/hooks/useApp'
import React, { SyntheticEvent, useState } from 'react'
import { TokenTransfer } from '@multiversx/sdk-core/out'
import { AppSection } from '../../../shared/ui/elements/AppSection'
import { Alert, Button, EntityTransferSelector } from '@peerme/web-ui'

type Props = {
  className?: string
}

export function BoostSection(props: Props) {
  const app = useApp()
  const [payment, setPayment] = useState<TokenTransfer | null>(null)

  const isInvalidPayment =
    !!payment && !payment.isEgld() && payment.tokenIdentifier !== EntityConfig.StableTokenId(app.config.network.env)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!payment || payment.amountAsBigInteger.isZero()) {
      app.showToast('Can not boost with zero', 'error')
      return
    }

    const value = payment.isEgld() ? payment.amount : 0n
    const tokenTransfers = payment.isEgld() ? [] : [payment]

    app.requestProposalAction(
      EntityContracts(app.config).Boost.Address,
      EntityContracts(app.config).Boost.Endpoint,
      value,
      [app.config.entity.address],
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
        {isInvalidPayment && (
          <Alert type="warning" className="mb-8">
            Please select {Constants.Egld.Id} or {EntityConfig.StableTokenName} to boost.
          </Alert>
        )}
        <Button color="blue" className="block w-full" disabled={!payment} type="submit">
          Boost now
        </Button>
      </form>
    </AppSection>
  )
}
