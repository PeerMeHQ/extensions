import { GraphQl } from './graphql'
import { BigNumber } from 'bignumber.js'
import { TokenTransfer } from '@multiversx/sdk-core'
import { useApp } from '../../../shared/hooks/useApp'
import { EntityTransferSelector } from '@peerme/web-ui'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { ApolloClient, NormalizedCacheObject, useQuery } from '@apollo/client'

type Props = {
  apolloClient: ApolloClient<NormalizedCacheObject>
}

export const _Swaps = (props: Props) => {
  const app = useApp()
  const [transfer, setTransfer] = useState<TokenTransfer | null>(null)
  const [tokenWantedId, _] = useState('')
  const [predictedOutAmount, setPredictedOutAmount] = useState<BigNumber>(new BigNumber(0))

  console.log(predictedOutAmount)

  const { loading, data: dexSwapData } = useQuery(GraphQl.Queries.xExchangeSwap, {
    variables: {
      amountIn: transfer?.amountAsBigInteger.toString(),
      tokenInID: transfer?.tokenIdentifier,
      tokenOutID: tokenWantedId,
      tolerance: 0.01,
    },
    errorPolicy: 'ignore',
    skip: !transfer || !tokenWantedId,
    client: props.apolloClient,
  })

  useEffect(() => {
    if (loading || !dexSwapData || !tokenWantedId) return
    console.log(dexSwapData.swap.amountOut)
    setPredictedOutAmount(new BigNumber(1))
  }, [dexSwapData])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!transfer) return

    app.requestProposalAction('', '', 0n, [], [transfer])
  }

  return (
    <form onSubmit={handleSubmit}>
      <EntityTransferSelector
        network={app.config.network}
        entity={app.config.entity}
        permissions={[]}
        onSelected={(val) => setTransfer(val)}
        className="mb-8"
      />
    </form>
  )
}
