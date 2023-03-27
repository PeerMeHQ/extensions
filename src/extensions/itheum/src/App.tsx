import React from 'react'
import { Tab } from '@headlessui/react'
import { TradeSection } from './trade/TradeSection'
import { AppRootProps } from '../../../shared/types'
import { useApp } from '../../../shared/hooks/useApp'
import { WalletSection } from './wallet/WalletSection'
import { MarketSection } from './market/MarketSection'
import { TabButton } from '../../../shared/ui/elements'
import { GeneralSection } from './general/GeneralSection'
import { faHandshakeSimple, faHome, faShop, faWallet } from '@fortawesome/free-solid-svg-icons'

export const App = (props: AppRootProps) => {
  const app = useApp(props)

  return (
    <Tab.Group>
      <Tab.List className="flex items-center space-x-2 md:space-x-4 mb-4">
        <TabButton icon={faHome}>General</TabButton>
        <TabButton icon={faHandshakeSimple}>Trade</TabButton>
        <TabButton icon={faWallet}>Wallet</TabButton>
        <TabButton icon={faShop}>Market</TabButton>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <GeneralSection app={app} />
        </Tab.Panel>
        <Tab.Panel>
          <TradeSection app={app} />
        </Tab.Panel>
        <Tab.Panel>
          <WalletSection app={app} />
        </Tab.Panel>
        <Tab.Panel>
          <MarketSection app={app} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
