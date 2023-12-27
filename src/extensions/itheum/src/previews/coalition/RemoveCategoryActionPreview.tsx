import React from 'react'
import { ProposalAction } from '@peerme/core-ts'
import { ActionPreviewHighlight } from '../../../../../shared/ui/elements'

type Props = {
  action: ProposalAction
}

export function RemoveCategoryActionPreview(props: Props) {
  const category = props.action.arguments[0] as string

  return (
    <ActionPreviewHighlight>
      remove the category <strong>{category}</strong> from our Data Coalition.
    </ActionPreviewHighlight>
  )
}
