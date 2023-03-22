import { GraphQl } from './graphql'
import { BigNumber } from 'bignumber.js'
import { PaymentSelector } from '@peerme/web-ui'
import { TokenPayment } from '@multiversx/sdk-core'
import { AppHook } from '../../../shared/hooks/useApp'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { ApolloClient, NormalizedCacheObject, useQuery } from '@apollo/client'

type Props = {
  app: AppHook
  apolloClient: ApolloClient<NormalizedCacheObject>
}

export const _Swaps = (props: Props) => {
  const [payment, setPayment] = useState<TokenPayment | null>(null)
  const [tokenWantedId, _] = useState('')
  const [predictedOutAmount, setPredictedOutAmount] = useState<BigNumber>(new BigNumber(0))

  console.log(predictedOutAmount)

  const { loading, data: dexSwapData } = useQuery(GraphQl.Queries.xExchangeSwap, {
    variables: {
      amountIn: payment?.amountAsBigInteger.toString(),
      tokenInID: payment?.tokenIdentifier,
      tokenOutID: tokenWantedId,
      tolerance: 0.01,
    },
    errorPolicy: 'ignore',
    skip: !payment || !tokenWantedId,
    client: props.apolloClient,
  })

  useEffect(() => {
    if (loading || !dexSwapData || !tokenWantedId) return
    console.log(dexSwapData.swap.amountOut)
    setPredictedOutAmount(new BigNumber(1))
  }, [dexSwapData])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!payment) return

    props.app.requestProposalAction('', '', 0, [], [payment])
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentSelector
        config={props.app.config.walletConfig}
        entity={props.app.config.entity}
        permissions={[]}
        onSelected={(val) => setPayment(val)}
        className="mb-8"
      />
    </form>
  )
}
