import React from 'react'
import { AppRootProps } from '../_shared/types'
import { useApp } from '../_shared/hooks/useApp'
import { AppSection } from '../_shared/ui/elements/AppSection'

export const ItheumApp = (props: AppRootProps) => {
  const app = useApp(props)

  console.log(app)

  return (
    <div>
      <AppSection title="Custom Title">Custom content</AppSection>
    </div>
  )
}
