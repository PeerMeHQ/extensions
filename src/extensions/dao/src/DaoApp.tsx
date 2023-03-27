import React from 'react'
import { useApp } from '../../../shared/hooks/useApp'
import { AppSection } from '../../../shared/ui/elements/AppSection'

export const App = () => {
  const app = useApp()

  console.log(app)

  return (
    <div>
      <AppSection title="Herotag">Herotag App</AppSection>
    </div>
  )
}
