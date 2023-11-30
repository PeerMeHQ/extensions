import { Config } from '../config'
import { EsdtPool } from '../types'
import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import { ExtensionConfig } from '../../../../shared/types'
import { ProposalAction, toActionArgsBigNumber } from '@peerme/core-ts'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'

type Props = {
  action: ProposalAction
  config: ExtensionConfig
}

export function UnstakeEsdtActionPreview(props: Props) {
  const [selectedPool, setSelectedPool] = useState<EsdtPool | null>(null)
  const poolId = props.action.arguments[0] as number
  const optAmount = props.action.arguments[1] as number | null
  const amountBig = optAmount ? toActionArgsBigNumber(optAmount) : new BigNumber(0)
  const amount = amountBig.shiftedBy(-(selectedPool?.stake_token_decimal || 0))

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
        {amount.toNumber()} {selectedPool ? selectedPool.stake_token_id : ''}
      </strong>{' '}
      {selectedPool ? `from pool ${selectedPool.title}` : `from pool with id ${poolId}`}.
    </ActionPreviewHighlight>
  )
}
