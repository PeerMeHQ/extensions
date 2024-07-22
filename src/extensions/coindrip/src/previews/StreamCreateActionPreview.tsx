import React from 'react'
import { TokenTransfer } from '@multiversx/sdk-core'
import { AddressPresenter, Tooltip } from '@peerme/web-ui'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'
import { useApp } from '../../../../shared/hooks/useApp'

type Props = {
  action: ProposalAction
}

export const StreamCreateActionPreview = (props: Props) => {
  const app = useApp()
  const receiver = props.action.arguments[0]
  const startsAt = new Date(parseInt(props.action.arguments[1]?.toString() || '0') * 1000)
  const endsAt = new Date(parseInt(props.action.arguments[2]?.toString() || '0') * 1000)

  const displayableCancel = !!props.action.arguments[3] ? 'cancellable' : ''
  const displayablePayments =
    props.action.payments.length > 0
      ? props.action.payments
          .map((payment) => toFormattedTokenPayment(toTokenPaymentFromProposalPayment(payment)))
          .join(', ')
      : toFormattedTokenPayment(TokenTransfer.egldFromBigInteger(props.action.value.toString()))

  return (
    <ActionPreviewHighlight>
      create a <strong>{displayableCancel}</strong> token stream of <strong>{displayablePayments}</strong> to{' '}
      <AddressPresenter network={app.config.network} value={receiver?.toString() || ''} trim={4} inline /> starting at{' '}
      <_Date value={startsAt} /> until <_Date value={endsAt} />.
    </ActionPreviewHighlight>
  )
}

const _Date = (props: { value: Date }) => (
  <Tooltip tip={props.value.toLocaleTimeString()}>
    <span>{props.value.toLocaleDateString()}</span>
  </Tooltip>
)
