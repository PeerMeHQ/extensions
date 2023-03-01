import React from 'react'
import { _Swapper } from './_Swapper'
import { XExchangeConfig } from './config'
import { AppRootProps } from '../../_shared/types'
import { useApp } from '../../_shared/hooks/useApp'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { AppSection } from '../../_shared/ui/elements/AppSection'

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
