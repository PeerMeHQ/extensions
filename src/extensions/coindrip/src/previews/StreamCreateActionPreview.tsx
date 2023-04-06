import React from 'react'
import { TokenPayment } from '@multiversx/sdk-core'
import { AddressPresenter, Tooltip } from '@peerme/web-ui'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'

type Props = {
  action: ProposalAction
}

export const StreamCreateActionPreview = (props: Props) => {
  const receiver = props.action.arguments[0]
  const startsAt = new Date(parseInt(props.action.arguments[1]?.toString() || '0') * 1000)
  const endsAt = new Date(parseInt(props.action.arguments[2]?.toString() || '0') * 1000)

  const displayableCancel = !!props.action.arguments[3] ? 'cancellable' : ''
  const displayablePayments =
    props.action.payments.length > 0
      ? props.action.payments
          .map((payment) => toFormattedTokenPayment(toTokenPaymentFromProposalPayment(payment)))
          .join(', ')
      : toFormattedTokenPayment(TokenPayment.egldFromBigInteger(props.action.value))

  return (
    <ActionPreviewHighlight>
      create a <strong>{displayableCancel}</strong> token stream of <strong>{displayablePayments}</strong> to{' '}
      <AddressPresenter value={receiver?.toString() || ''} trim={4} inline /> starting at <_Date value={startsAt} />{' '}
      until <_Date value={endsAt} />.
    </ActionPreviewHighlight>
  )
}

const _Date = (props: { value: Date }) => (
  <Tooltip tip={props.value.toLocaleTimeString()}>
    <span>{props.value.toLocaleDateString()}</span>
  </Tooltip>
)
