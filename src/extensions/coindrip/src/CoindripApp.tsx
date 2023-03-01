import React from 'react'
import { _StreamCreator } from './_StreamCreator'
import { AppRootProps } from '../../_shared/types'
import { useApp } from '../../_shared/hooks/useApp'
import { AppSection } from '../../_shared/ui/elements/AppSection'

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
