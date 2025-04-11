import { ProposalAction } from '@peerme/core-ts'
import { WarpArgSerializer } from '@vleap/warps'
import React, { useEffect, useState } from 'react'
import { ExtensionConfig } from '../../../../shared/types'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { Config } from '../config'
import { EsdtPool } from '../types'

type Props = {
  action: ProposalAction
  config: ExtensionConfig
}

export function ClaimActionPreview(props: Props) {
  const was = new WarpArgSerializer()
  const poolId = was.stringToNative(props.action.arguments[0])[1] as number
  const [selectedPool, setSelectedPool] = useState<EsdtPool | null>(null)

  useEffect(() => {
    if (!poolId) return
    fetch(Config.ApiBaseUrl(props.config.network.env) + '/tokenstaking/' + poolId).then(async (res) => {
      const data = await res.json()
      setSelectedPool(data)
    })
  }, [poolId])

  return (
    <ActionPreviewHighlight>
      claim rewards {selectedPool ? `from pool ${selectedPool.title}` : `from pool with id ${poolId}`}.
    </ActionPreviewHighlight>
  )
}
