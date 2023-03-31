import React from 'react'
import { Tab } from '@headlessui/react'
import { _BulkTransactions } from './_BulkTransactions'
import { AppSection, TabButton } from '../../../shared/ui/elements/index'
import { faCertificate, faCoins, faTrophy } from '@fortawesome/free-solid-svg-icons'

export const App = () => (
  <Tab.Group>
    <Tab.List className="flex items-center space-x-2 md:space-x-4 mb-4">
      <TabButton icon={faCoins}>EGLD/ESDTs</TabButton>
      <TabButton icon={faCertificate}>NFTs</TabButton>
      <TabButton icon={faTrophy}>Draws</TabButton>
    </Tab.List>
    <Tab.Panels>
      <Tab.Panel>
        <AppSection title="Send Bulk Transactions">
          <_BulkTransactions />
        </AppSection>
      </Tab.Panel>
      <Tab.Panel>
        <AppSection title="Distribute NFTs">
          <label className="text-xl text-gray-700 dark:text-gray-200">Coming soon...</label>
        </AppSection>
      </Tab.Panel>
      <Tab.Panel>
        <AppSection title="Make a draw">
          <label className="text-xl text-gray-700 dark:text-gray-200">Coming soon...</label>
        </AppSection>
      </Tab.Panel>
    </Tab.Panels>
  </Tab.Group>
)
