import React from 'react'
import { AppRootProps } from '../../../types'
import { useApp } from '../../../hooks/useApp'
import { AppSection } from '../../../ui/elements/AppSection'

export const XExchangeApp = (props: AppRootProps) => {
  const app = useApp(props)

  console.log(app)

  return (
    <div>
      <AppSection title="Swap">Swap Interface</AppSection>
    </div>
  )
}
