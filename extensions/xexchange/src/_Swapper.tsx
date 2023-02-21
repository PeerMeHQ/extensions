import { GraphQl } from './graphql'
import { BigNumber } from 'bignumber.js'
import { AppHook } from '../../_shared/hooks/useApp'
import { PaymentSelector } from '@peerme/web-ui'
import { TokenPayment } from '@elrondnetwork/erdjs'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { ApolloClient, NormalizedCacheObject, useQuery } from '@apollo/client'

type Props = {
  app: AppHook
  apolloClient: ApolloClient<NormalizedCacheObject>
}

export const _Swapper = (props: Props) => {
  const [payment, setPayment] = useState<TokenPayment | null>(null)
  const [tokenWantedId, _] = useState('')
  const [predictedOutAmount, setPredictedOutAmount] = useState<BigNumber>(new BigNumber(0))

  console.log(predictedOutAmount)

  const { loading, data: dexSwapData } = useQuery(GraphQl.Queries.xExchangeSwap, {
    variables: {
      amountIn: payment?.amountAsBigInteger.toString(),
      tokenInID: payment?.tokenIdentifier,
      tokenOutID: '',
      tolerance: 0.01,
    },
    errorPolicy: 'ignore',
    skip: !payment,
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
        entity={props.app.config.entity}
        permissions={[]}
        onSelected={(val) => setPayment(val)}
        className="mb-8"
      />
    </form>
  )
}
