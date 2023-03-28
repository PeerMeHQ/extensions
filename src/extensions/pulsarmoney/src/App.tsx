import React from 'react'
import { _Vaults } from './_Vaults'
import { _Vesting } from './_Vesting'
import { _Payments } from './_Payments'
import { Tab } from '@headlessui/react'
import { useApp } from '../../../shared/hooks/useApp'
import { AppSection, TabButton } from '../../../shared/ui/elements'
import { faMoneyBill, faVault, faVest } from '@fortawesome/free-solid-svg-icons'

export const App = () => {
  const app = useApp()

  // The app hook provides access to the extension configuration
  // and useful methods for interacting with DAOs.
  console.log(app)

  return (
    <Tab.Group>
      <Tab.List className="flex items-center space-x-2 md:space-x-4 mb-4">
        <TabButton icon={faVest}>Vesting</TabButton>
        <TabButton icon={faVault}>Vaults</TabButton>
        <TabButton icon={faMoneyBill}>Payments</TabButton>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <AppSection title="Vest Tokens from the DAO Vault">
            <_Vesting />
          </AppSection>
        </Tab.Panel>
        <Tab.Panel>
          <AppSection title="Lock Assets">
            <_Vaults />
          </AppSection>
        </Tab.Panel>
        <Tab.Panel>
          <AppSection title="Create a Pulsar Token Stream">
            <_Payments />
          </AppSection>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
