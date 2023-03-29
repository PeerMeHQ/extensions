import { Config } from './config'
import React, { useEffect, useState } from 'react'
import { useApp } from '../../../shared/hooks/useApp'
import { DelegateSection } from './delegation/DelegateSection'
import { OverviewSection } from './delegation/OverviewSection'
import { DelegationInfo, DelegationProvider } from './types'
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers'
import { DelegationsSection } from './delegation/DelegationsSection'
import { getDelegationInfoRequest, getDelegationProvidersRequest } from './api'

export const App = () => {
  const app = useApp()
  const delegationNetworkProvider = new ApiNetworkProvider(Config.Urls.Delegation(app.config.network))
  const [providers, setProviders] = useState<DelegationProvider[]>([])
  const [delegations, setDelegations] = useState<DelegationInfo[]>([])

  useEffect(() => {
    getDelegationProvidersRequest(delegationNetworkProvider).then((p) => setProviders(p))
    getDelegationInfoRequest(delegationNetworkProvider, app.config.entity.address).then((d) => setDelegations(d))
  }, [])

  return (
    <>
      <OverviewSection delegations={delegations} className="mb-4" />
      <DelegationsSection providers={providers} delegations={delegations} className="mb-4" />
      <DelegateSection providers={providers} className="mb-4" />
    </>
  )
}
