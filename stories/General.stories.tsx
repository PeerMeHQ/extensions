import React from 'react'
import { Setup } from './setup'
import { AppSelector } from '../src/ui/AppSelector'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  title: 'Overview',
  component: AppSelector,
} as ComponentMeta<typeof AppSelector>

const Template: ComponentStory<typeof AppSelector> = (args) => (
  <AppSelector
    config={Setup.Config}
    onActionAddRequest={(action) => alert('Requested Action:' + JSON.stringify(action))}
    onNotificationRequest={(text, type) => alert(`${type} -> ${text}`)}
    onAppSelected={() => {}}
  />
)

export const Default = Template.bind({})
Default.args = {}
