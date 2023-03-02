import React from 'react'
import { AppRootProps } from '../../../shared/types'
import { useApp } from '../../../shared/hooks/useApp'
import { AppSection } from '../../../shared/ui/elements/AppSection'

export const DaoApp = (props: AppRootProps) => {
  const app = useApp(props)

  console.log(app)

  return (
    <div>
      <AppSection title="Herotag">Herotag App</AppSection>
    </div>
  )
}
