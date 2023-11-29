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

export function UnstakeEsdtActionPreview(props: Props) {
  const poolId = props.action.arguments[0] as number
  const optAmount = props.action.arguments[1] as number | null
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
      unstake{' '}
      <strong>
        {optAmount ? optAmount : 'all'} {selectedPool ? selectedPool.stake_token_id : ''}
      </strong>{' '}
      {selectedPool ? `from pool ${selectedPool.title}` : `from pool with id ${poolId}`}.
    </ActionPreviewHighlight>
  )
}
