import { Config } from '../config'
import { EsdtPool } from '../types'
import React, { useEffect, useState } from 'react'
import { TokenTransfer } from '@multiversx/sdk-core/out'
import { ExtensionConfig } from '../../../../shared/types'
import { ActionPreviewHighlight } from '../../../../shared/ui/elements'
import { ProposalAction, toFormattedTokenPayment, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'

type Props = {
  action: ProposalAction
  config: ExtensionConfig
}

export function StakeActionPreview(props: Props) {
  const poolId = props.action.arguments[0] as number
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
