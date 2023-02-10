import React from 'react'
import { AppRootProps } from '../../../types'
import { useApp } from '../../../hooks/useApp'
import { _Transactions } from './_Transactions'
import { AppSection } from '../../../ui/elements/AppSection'

export const XBulkApp = (props: AppRootProps) => {
  const app = useApp(props)

  return (
    <div>
      <AppSection title="Send Bulk Transactions">
        <_Transactions app={app} />
      </AppSection>
    </div>
  )
}
