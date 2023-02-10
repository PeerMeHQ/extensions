import React from 'react'
import { AppRootProps } from '../../../types'
import { useApp } from '../../../hooks/useApp'
import { _StreamCreator } from './_StreamCreator'
import { AppSection } from '../../../ui/elements/AppSection'

export const CoindripApp = (props: AppRootProps) => {
  const app = useApp(props)

  return (
    <div>
      <AppSection title="Create a Stream">
        <_StreamCreator app={app} />
      </AppSection>
    </div>
  )
}
