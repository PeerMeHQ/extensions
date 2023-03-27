import React from 'react'
import { AppHook } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'

type Props = {
  app: AppHook
}

export const WalletSection = (props: Props) => {
  return (
    <AppSection title="Wallet">
      <p>Coming soon.</p>
    </AppSection>
  )
}
