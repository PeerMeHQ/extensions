import React from 'react'
import { Config } from '../config'
import { ProposalAction } from '@peerme/core-ts'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'

type Props = {
  action: ProposalAction
}

export const ClaimActionPreview = (props: Props) => {
  const typeIndex = props.action.arguments[0] as number
  const displayableTypeName = Config.Claims.OrderedTypeNames[typeIndex] || '-'

  return (
    <ActionPreviewHighlight>
      claim <strong>{displayableTypeName}</strong>.
    </ActionPreviewHighlight>
  )
}
