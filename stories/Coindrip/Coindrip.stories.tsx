import React from 'react'
import { Setup } from '../setup'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CoindripApp } from '../../src/extensions/coindrip/src/CoindripApp'

export default {
  title: 'Extensions/Coindrip/App',
  component: CoindripApp,
} as ComponentMeta<typeof CoindripApp>

const Template: ComponentStory<typeof CoindripApp> = (args) => <CoindripApp {...Setup.AppRootProps} />

export const Default = Template.bind({})
Default.args = {}
