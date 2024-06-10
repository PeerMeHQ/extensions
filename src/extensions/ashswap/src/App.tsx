import React from 'react'
import { SwapTab } from './swap/SwapTab'
import { useApp } from '../../../shared/hooks/useApp'
import { TabButton } from '../../../shared/ui/elements'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

export const App = () => {
  const app = useApp()

  console.log(app)

  return (
    <TabGroup>
      <TabList className="flex items-center space-x-2 md:space-x-4 mb-4">
        <TabButton icon={faSyncAlt}>General</TabButton>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SwapTab />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}
