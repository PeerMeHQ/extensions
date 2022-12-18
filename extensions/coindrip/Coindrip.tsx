import React from 'react'
import { AppRootProps } from '../../src/types'
import { useApp } from '../../src/hooks/useApp'
import { StreamCreator } from './src/StreamCreator'
import { AppSection } from '../../src/ui/extension/AppSection'

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
