import React from 'react'
import { Tab } from '@headlessui/react'
import { PayrollTab } from './payroll/PayrollTab'
import { TabButton } from '../../../shared/ui/elements'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { SubscriptionTab } from './subscription/SubscriptionTab'

export const App = () => {
  return (
    <Tab.Group>
      <Tab.List className="flex items-center space-x-2 md:space-x-4 mb-4">
        <TabButton icon={faCoins}>Payroll</TabButton>
        <TabButton icon={faCoins}>Subscriptions</TabButton>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <PayrollTab />
        </Tab.Panel>
        <Tab.Panel>
          <SubscriptionTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
