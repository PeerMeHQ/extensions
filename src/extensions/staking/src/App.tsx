import React, { useEffect, useState } from 'react'
import { useApp } from '../../../shared/hooks/useApp'
import { DelegateSection } from './delegation/DelegateSection'
import { OverviewSection } from './delegation/OverviewSection'
import { DelegationInfo, DelegationProvider } from './types'
import { DelegationsSection } from './delegation/DelegationsSection'
import { getDelegationInfoRequest, getDelegationProvidersRequest } from './api'

export const App = () => {
  const app = useApp()
  const [providers, setProviders] = useState<DelegationProvider[]>([])
  const [delegations, setDelegations] = useState<DelegationInfo[]>([])

  useEffect(() => {
    getDelegationProvidersRequest(app.networkProvider).then((p) => setProviders(p))
    getDelegationInfoRequest(app.networkProvider, app.config.entity.address).then((d) => setDelegations(d))
  }, [])

  return (
    <>
      <OverviewSection delegations={delegations} className="mb-4" />
      {delegations.length > 0 && (
        <DelegationsSection providers={providers} delegations={delegations} className="mb-4" />
      )}
      <DelegateSection providers={providers} className="mb-4" />
    </>
  )
}
