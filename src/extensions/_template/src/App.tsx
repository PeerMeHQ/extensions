import React from 'react'
import { useApp } from '../../../shared/hooks/useApp'
import { AppSection } from '../../../shared/ui/elements'

export const App = () => {
  const app = useApp()

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
