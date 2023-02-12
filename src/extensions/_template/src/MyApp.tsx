import React from 'react'
import { AppRootProps } from '../../../types'
import { useApp } from '../../../hooks/useApp'
import { AppSection } from '../../../ui/elements/AppSection'

export const MyApp = (props: AppRootProps) => {
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
