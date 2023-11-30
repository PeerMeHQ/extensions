import { Config } from '../config'
import { EsdtPool } from '../types'
import { ProposalAction } from '@peerme/core-ts'
import React, { useEffect, useState } from 'react'
import { ExtensionConfig } from '../../../../shared/types'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'

type Props = {
  action: ProposalAction
  config: ExtensionConfig
}

export function ClaimEsdtActionPreview(props: Props) {
  const poolId = props.action.arguments[0] as number
  const [selectedPool, setSelectedPool] = useState<EsdtPool | null>(null)

  useEffect(() => {
    if (!poolId) return
    fetch(Config.ApiBaseUrl(props.config.network) + '/tokenstaking/' + poolId).then(async (res) => {
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
