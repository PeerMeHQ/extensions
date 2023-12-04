import React from 'react'
import { NftTab } from './nft/NftTab'
import { Tab } from '@headlessui/react'
import { EsdtTab } from './esdt/EsdtTab'
import { TabButton } from '../../../shared/ui/elements'
import { faCoins, faSquare } from '@fortawesome/free-solid-svg-icons'

export const App = () => {
  return (
    <Tab.Group>
      <Tab.List className="flex items-center space-x-2 md:space-x-4 mb-4">
        <TabButton icon={faCoins}>ESDT Staking</TabButton>
        <TabButton icon={faSquare}>NFT Staking</TabButton>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <EsdtTab />
        </Tab.Panel>
        <Tab.Panel>
          <NftTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
