import React from 'react'
import { ProposalAction } from '@peerme/core-ts'
import { ActionPreviewHighlight } from '../../../../../shared/ui/elements'

type Props = {
  action: ProposalAction
}

export function AddCategoryActionPreview(props: Props) {
  const category = props.action.arguments[0] as string

  return (
    <ActionPreviewHighlight>
      create a new category for our Data Coalition: <strong>{category}</strong>
    </ActionPreviewHighlight>
  )
}
