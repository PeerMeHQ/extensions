import React from 'react'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'

export function SubscriptionTab() {
  const app = useApp()

  console.log(app)

  return <AppSection title="Subscription Section">Coming soon.</AppSection>
}
