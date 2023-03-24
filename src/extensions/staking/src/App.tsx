import React from 'react'
import { AppRootProps } from '../../../shared/types'
import { useApp } from '../../../shared/hooks/useApp'
import { _DelegateSection } from './_DelegateSection'
import { _OverviewSection } from './_OverviewSection'

export const App = (props: AppRootProps) => {
  const app = useApp(props)

  return (
    <>
      <_OverviewSection app={app} className="mb-4" />
      <_DelegateSection app={app} />
    </>
  )
}
