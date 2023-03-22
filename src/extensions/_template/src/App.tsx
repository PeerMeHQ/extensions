import React from 'react'
import { AppRootProps } from '../../../shared/types'
import { useApp } from '../../../shared/hooks/useApp'
import { AppSection } from '../../../shared/ui/elements/AppSection'

export const App = (props: AppRootProps) => {
  const app = useApp(props)

  // The app hook provides access to the extension configuration
  // and useful methods for interacting with DAOs.
  console.log(app)

  return (
    <div>
      <AppSection title="Example Section">
        <p>Example paragraph</p>
      </AppSection>
    </div>
  )
}
