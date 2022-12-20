import React from 'react'
import { AppRootProps } from '../../src/types'
import { useApp } from '../../src/hooks/useApp'
import { AppSection } from '../../src/ui/extension/AppSection'

export const Itheum = (props: AppRootProps) => {
  const app = useApp(props)

  console.log(app)

  return (
    <div>
      <AppSection title="Custom Title">Custom content</AppSection>
    </div>
  )
}
