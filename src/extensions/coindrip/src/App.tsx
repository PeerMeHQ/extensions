import React from 'react'
import { _StreamCreator } from './_StreamCreator'
import { AppSection } from '../../../shared/ui/elements/AppSection'

export const App = () => {
  return (
    <div>
      <AppSection title="Create a Stream">
        <_StreamCreator />
      </AppSection>
    </div>
  )
}
