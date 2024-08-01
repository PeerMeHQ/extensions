import { faGripVertical, faWrench } from '@fortawesome/free-solid-svg-icons'
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import React from 'react'
import { TabButton } from '../../../shared/ui/elements'
import { GuildsTab } from './guilds/GuildsTab'
import { ManageTab } from './manage/ManageTab'

export const App = () => {
  return (
    <TabGroup>
      <TabList className="flex items-center space-x-2 md:space-x-4 mb-4">
        <TabButton icon={faGripVertical}>Guilds</TabButton>
        <TabButton icon={faWrench}>Manage</TabButton>
      </TabList>
      <TabPanels>
        <TabPanel>
          <GuildsTab />
        </TabPanel>
        <TabPanel>
          <ManageTab />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}
