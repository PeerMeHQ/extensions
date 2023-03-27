import React from 'react'
import { AppHook } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'

type Props = {
  app: AppHook
}

export const MarketSection = (props: Props) => {
  return (
    <AppSection title="Market">
      <p>Coming soon.</p>
    </AppSection>
  )
}
