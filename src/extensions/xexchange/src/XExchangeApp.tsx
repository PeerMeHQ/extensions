import React from 'react'
import { _Swapper } from './_Swapper'
import { XExchangeConfig } from './config'
import { AppRootProps } from '../../../types'
import { useApp } from '../../../hooks/useApp'
import { AppSection } from '../../../ui/elements/AppSection'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const XExchangeApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: XExchangeConfig.Urls.GraphQl,
})

export const XExchangeApp = (props: AppRootProps) => {
  const app = useApp(props)

  return (
    <div>
      <AppSection title="Swap">
        <_Swapper app={app} apolloClient={XExchangeApolloClient} />
      </AppSection>
    </div>
  )
}
