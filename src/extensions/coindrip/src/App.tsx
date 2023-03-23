import React from 'react'
import { _StreamCreator } from './_StreamCreator'
import { AppRootProps } from '../../../shared/types'
import { useApp } from '../../../shared/hooks/useApp'
import { AppSection } from '../../../shared/ui/elements/AppSection'

export const App = (props: AppRootProps) => {
  const app = useApp(props)

  return (
    <div>
      <AppSection title="Create a Stream">
        <_StreamCreator app={app} />
      </AppSection>
    </div>
  )
}
