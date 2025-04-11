import { ProposalAction } from '@peerme/core-ts'
import { WarpArgSerializer } from '@vleap/warps'
import React from 'react'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { Config } from '../config'

type Props = {
  action: ProposalAction
}

export function ClaimActionPreview(props: Props) {
  const was = new WarpArgSerializer()
  const typeIndex = was.stringToNative(props.action.arguments[0])[1] as number
  const displayableTypeName = Config.Claims.OrderedTypeNames[typeIndex] || '-'

  return (
    <ActionPreviewHighlight>
      claim <strong>{displayableTypeName}</strong>.
    </ActionPreviewHighlight>
  )
}
