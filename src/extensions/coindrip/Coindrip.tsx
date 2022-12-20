import React from 'react'
import { AppRootProps } from '../../types'
import { useApp } from '../../hooks/useApp'
import { StreamCreator } from './src/StreamCreator'
import { AppSection } from '../../ui/elements/AppSection'

export const Coindrip = (props: AppRootProps) => {
  const app = useApp(props)

  return (
    <div>
      <AppSection title="Create a Stream">
        <StreamCreator app={app} />
      </AppSection>
    </div>
  )
}
