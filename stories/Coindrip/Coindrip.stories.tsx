import React from 'react'
import { Setup } from '../setup'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Coindrip } from '../../src/extensions/coindrip/Coindrip'

export default {
  title: 'Extension/Coindrip',
  component: Coindrip,
} as ComponentMeta<typeof Coindrip>

const Template: ComponentStory<typeof Coindrip> = (args) => (
  <Coindrip {...Setup.AppRootProps} />
)

export const Default = Template.bind({})
Default.args = {}
