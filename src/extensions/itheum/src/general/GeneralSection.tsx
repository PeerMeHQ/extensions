import React from 'react'
import { AppHook } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'

type Props = {
  app: AppHook
}

export const GeneralSection = (props: Props) => {
  return (
    <AppSection title="General">
      <p>Coming soon.</p>
    </AppSection>
  )
}
