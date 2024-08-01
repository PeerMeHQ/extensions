import { ProposalAction } from '@peerme/core-ts'
import React from 'react'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'

type Props = {
  action: ProposalAction
}

export function GuildDeployActionPreview(props: Props) {
  return <ActionPreviewHighlight>deploy a new guild.</ActionPreviewHighlight>
}
