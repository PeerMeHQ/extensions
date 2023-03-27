import React from 'react'
import { _ProcureSection } from './_ProcureSection'
import { AppHook } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'

export const MarketSection = ({ app }: { app: AppHook }) => {
  return (
    <>
      <_ProcureSection app={app} className="mb-4" />
      <AppSection title="Latest Listings">
        <p>Coming soon.</p>
      </AppSection>
    </>
  )
}
