import React from 'react'
import { _Transactions } from './_Transactions'
import { AppRootProps } from '../../../shared/types'
import { useApp } from '../../../shared/hooks/useApp'
import { AppSection } from '../../../shared/ui/elements/AppSection'

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
