import React from 'react'
import { AppHook } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'

type Props = {
  app: AppHook
}

export const TradeSection = (props: Props) => {
  return (
    <AppSection title="Trade">
      <p>Coming soon.</p>
    </AppSection>
  )
}
