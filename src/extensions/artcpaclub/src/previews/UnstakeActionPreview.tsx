import { ProposalAction, toFormattedTokenAmount } from '@peerme/core-ts'
import { WarpArgSerializer } from '@vleap/warps'
import React, { useEffect, useState } from 'react'
import { ExtensionConfig } from '../../../../shared/types'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { Config } from '../config'
import { EsdtPool, NftPool } from '../types'

type Props = {
  action: ProposalAction
  config: ExtensionConfig
}

export function UnstakeActionPreview(props: Props) {
  const was = new WarpArgSerializer()
  const [selectedPool, setSelectedPool] = useState<EsdtPool | NftPool | null>(null)
  const isNft = props.action.arguments.length === 3
  const poolId = was.stringToNative(props.action.arguments[0])[1] as number
  const nonce = (isNft ? was.stringToNative(props.action.arguments[1])[1] : null) as number | null
  const optAmount = (
    isNft ? was.stringToNative(props.action.arguments[2])[1] : was.stringToNative(props.action.arguments[1])[1]
  ) as number | null
  const amountBig = optAmount ? BigInt(optAmount) : BigInt(0)

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
