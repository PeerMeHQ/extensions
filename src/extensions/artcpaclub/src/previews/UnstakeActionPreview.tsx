import { Config } from '../config'
import { EsdtPool, NftPool } from '../types'
import React, { useEffect, useState } from 'react'
import { ExtensionConfig } from '../../../../shared/types'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { ProposalAction, toActionArgsBigInt, toFormattedTokenAmount } from '@peerme/core-ts'

type Props = {
  action: ProposalAction
  config: ExtensionConfig
}

export function UnstakeActionPreview(props: Props) {
  const [selectedPool, setSelectedPool] = useState<EsdtPool | NftPool | null>(null)
  const isNft = props.action.arguments.length === 3
  const poolId = props.action.arguments[0] as number
  const nonce = (isNft ? props.action.arguments[1] : null) as number | null
  const optAmount = (isNft ? props.action.arguments[2] : props.action.arguments[1]) as number | null
  const amountBig = optAmount ? toActionArgsBigInt(optAmount) : BigInt(0)

  useEffect(() => {
    if (!poolId) return
    const apiEndpoint = isNft ? 'nftstaking' : 'tokenstaking'
    fetch(Config.ApiBaseUrl(props.config.network.env) + '/' + apiEndpoint + '/' + poolId).then(async (res) => {
      const data = await res.json()
      setSelectedPool(data)
    })
  }, [poolId])

  if (isNft) {
    return (
      <ActionPreviewHighlight>
        unstake{' '}
        <strong>
          {amountBig.toString()} {selectedPool ? selectedPool.stake_token_id : ''}
        </strong>{' '}
        with Nonce <strong>{nonce}</strong>{' '}
        {selectedPool ? `from pool ${selectedPool.title}` : `from pool with id ${poolId}`}.
      </ActionPreviewHighlight>
    )
  }

  return (
    <ActionPreviewHighlight>
      unstake{' '}
      <strong>
        {toFormattedTokenAmount(amountBig, (selectedPool as EsdtPool)?.stake_token_decimal || 0)}{' '}
        {selectedPool ? selectedPool.stake_token_id : ''}
      </strong>{' '}
      {selectedPool ? `from pool ${selectedPool.title}` : `from pool with id ${poolId}`}.
    </ActionPreviewHighlight>
  )
}
