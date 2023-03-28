import React from 'react'
import { _Swaps } from './_Swaps'
import { Tab } from '@headlessui/react'
import { XExchangeConfig } from './config'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { AppSection, TabButton } from '../../../shared/ui/elements'

const XExchangeApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: XExchangeConfig.Urls.GraphQl,
})

export const App = () => {
  return (
    <Tab.Group>
      <Tab.List className="flex items-center space-x-2 md:space-x-4 mb-4">
        <TabButton icon={faArrowsRotate}>Swap</TabButton>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <AppSection title="Swap">
            <_Swaps apolloClient={XExchangeApolloClient} />
          </AppSection>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
