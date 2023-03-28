import React from 'react'
import { Tab } from '@headlessui/react'
import { GeneralTab } from './general/GeneralTab'
import { TradeSection } from './trade/TradeSection'
import { WalletSection } from './wallet/WalletSection'
import { MarketSection } from './market/MarketSection'
import { TabButton } from '../../../shared/ui/elements'
import { faHandshakeSimple, faHome, faShop, faWallet } from '@fortawesome/free-solid-svg-icons'

export const App = () => (
  <Tab.Group>
    <Tab.List className="flex items-center space-x-2 md:space-x-4 mb-4">
      <TabButton icon={faHome}>General</TabButton>
      <TabButton icon={faWallet}>Wallet</TabButton>
      <TabButton icon={faHandshakeSimple}>Trade</TabButton>
      <TabButton icon={faShop}>Market</TabButton>
    </Tab.List>
    <Tab.Panels>
      <Tab.Panel>
        <GeneralTab />
      </Tab.Panel>
      <Tab.Panel>
        <WalletSection />
      </Tab.Panel>
      <Tab.Panel>
        <TradeSection />
      </Tab.Panel>
      <Tab.Panel>
        <MarketSection />
      </Tab.Panel>
    </Tab.Panels>
  </Tab.Group>
)
