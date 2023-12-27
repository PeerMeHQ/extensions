import React from 'react'
import { Input } from '@peerme/web-ui'
import { CoalitionInfo } from '../types'
import { AppSection } from '../../../../shared/ui/elements'

type Props = {
  info: CoalitionInfo
  className?: string
}

export function _AggregatorSection(props: Props) {
  return (
    <AppSection
      title="Data Aggregator"
      description="The Data Aggregator curates and enhances data of providers for specialized purposes."
      className={props.className}
    >
      <Input onChange={() => {}} value={props.info.aggregator} disabled />
    </AppSection>
  )
}
