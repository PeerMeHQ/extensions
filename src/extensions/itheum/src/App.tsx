import { Contracts } from './contracts'
import { Tab } from '@headlessui/react'
import { TradeTab } from './trade/TradeTab'
import { useScQuery } from '@peerme/core-ts'
import { MarketRequirements } from './types'
import { WalletTab } from './wallet/WalletTab'
import { MarketTab } from './market/MarketTab'
import { GeneralTab } from './general/GeneralTab'
import React, { useEffect, useState } from 'react'
import { toTypedMarketRequirements } from './helpers'
import { useApp } from '../../../shared/hooks/useApp'
import { TabButton } from '../../../shared/ui/elements'
import { CoalitionTab } from './coalition/CoalitionTab'
import { faHandshakeSimple, faHome, faShop, faUsers, faWallet } from '@fortawesome/free-solid-svg-icons'

export function App() {
  const app = useApp()
  const [marketRequirements, setMarketRequirements] = useState<MarketRequirements | null>(null)
  const marketRequirementsScQuery = useScQuery(app.config.walletConfig, Contracts(app.config).ViewMarketRequirements)

  useEffect(() => {
    marketRequirementsScQuery
      .query([])
      .then((bundle) => setMarketRequirements(toTypedMarketRequirements(bundle.firstValue?.valueOf())))
  }, [])

  return (
    <Tab.Group>
      <Tab.List className="flex items-center space-x-2 md:space-x-4 mb-4">
        <TabButton icon={faHome}>General</TabButton>
        <TabButton icon={faUsers}>Coalition</TabButton>
        <TabButton icon={faWallet}>Wallet</TabButton>
        <TabButton icon={faHandshakeSimple}>Trade</TabButton>
        <TabButton icon={faShop}>Market</TabButton>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <GeneralTab />
        </Tab.Panel>
        <Tab.Panel>
          <CoalitionTab />
        </Tab.Panel>
        <Tab.Panel>
          <WalletTab marketRequirements={marketRequirements} />
        </Tab.Panel>
        <Tab.Panel>
          <TradeTab />
        </Tab.Panel>
        <Tab.Panel>
          <MarketTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
