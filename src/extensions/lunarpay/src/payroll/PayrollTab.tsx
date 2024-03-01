import React from 'react'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'

export function PayrollTab() {
  const app = useApp()

  console.log(app)

  return <AppSection title="Payroll Section">Coming soon.</AppSection>
}
