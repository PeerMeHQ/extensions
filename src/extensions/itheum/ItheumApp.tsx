import React from 'react'
import { useApp } from '../../shared/hooks/useApp'
import { AppSection } from '../../shared/ui/elements/AppSection'

export const ItheumApp = () => {
  const app = useApp()

  console.log(app)

  return (
    <div>
      <AppSection title="Custom Title">Custom content</AppSection>
    </div>
  )
}
