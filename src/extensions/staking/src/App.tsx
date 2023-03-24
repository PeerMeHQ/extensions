import React from 'react'
import { _Overview } from './_Overview'
import { _Delegate } from './_Delegate'
import { AppRootProps } from '../../../shared/types'
import { useApp } from '../../../shared/hooks/useApp'
import { AppSection } from '../../../shared/ui/elements'

export const App = (props: AppRootProps) => {
  const app = useApp(props)

  return (
    <div>
      <AppSection title="Overview" className="mb-4">
        <_Overview app={app} />
      </AppSection>
      <AppSection title="Stake now">
        <_Delegate app={app} />
      </AppSection>
    </div>
  )
}
