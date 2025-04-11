import { TokenTransfer } from '@multiversx/sdk-core/out'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'
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

export function StakeActionPreview(props: Props) {
  const was = new WarpArgSerializer()
  const poolId = was.stringToNative(props.action.arguments[0])[1] as number
  const [selectedPool, setSelectedPool] = useState<EsdtPool | null>(null)

  const displayablePayments =
    props.action.payments.length > 0
      ? props.action.payments
          .map((payment) => toFormattedTokenPayment(toTokenPaymentFromProposalPayment(payment)))
          .join(', ')
      : toFormattedTokenPayment(TokenTransfer.egldFromBigInteger(props.action.value.toString()))

  useEffect(() => {
    if (!poolId) return
    const isNft = props.action.payments.some((p) => p.tokenNonce !== 0)
    const endpoint = isNft ? 'nftstaking' : 'tokenstaking'
    fetch(`${Config.ApiBaseUrl(props.config.network.env)}/${endpoint}/${poolId}`).then(async (res) => {
      const data = await res.json()
      setSelectedPool(data)
    })
  }, [poolId])

  return (
    <ActionPreviewHighlight>
      stake <strong>{displayablePayments}</strong>{' '}
      {selectedPool ? `in pool ${selectedPool.title}` : `in pool with id ${poolId}`}.
    </ActionPreviewHighlight>
  )
}
