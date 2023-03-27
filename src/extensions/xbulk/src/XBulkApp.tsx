import React from 'react'
import { Tab } from '@headlessui/react'
import { _Transactions } from './_Transactions'
import { AppSection, TabButton } from '../../../shared/ui/elements/index'
import { faCertificate, faCoins, faTrophy } from '@fortawesome/free-solid-svg-icons'

export const XBulkApp = () => {
  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex items-center space-x-2 md:space-x-4 mb-4">
          <TabButton icon={faCoins}>EGLD/ESDTs</TabButton>
          <TabButton icon={faCertificate}>NFTs</TabButton>
          <TabButton icon={faTrophy}>Draws</TabButton>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <AppSection title="Send Bulk Transactions">
              <_Transactions />
            </AppSection>
          </Tab.Panel>
          <Tab.Panel>
            <AppSection title="Distribute NFTs">Coming soon.</AppSection>
          </Tab.Panel>
          <Tab.Panel>
            <AppSection title="Draw a winner">Coming soon.</AppSection>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
