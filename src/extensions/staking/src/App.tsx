import { Config } from './config'
import React, { useEffect, useState } from 'react'
import { AppRootProps } from '../../../shared/types'
import { useApp } from '../../../shared/hooks/useApp'
import { _DelegateSection } from './_DelegateSection'
import { _OverviewSection } from './_OverviewSection'
import { DelegationInfo, DelegationProvider } from './types'
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers'
import { _ActiveDelegationsSection } from './_ActiveDelegationsSection'
import { getDelegationInfoRequest, getDelegationProvidersRequest } from './api'

export const App = (props: AppRootProps) => {
  const app = useApp(props)
  const delegationNetworkProvider = new ApiNetworkProvider(Config.Urls.Delegation(app.config.network))
  const [providers, setProviders] = useState<DelegationProvider[]>([])
  const [delegations, setDelegations] = useState<DelegationInfo[]>([])

  useEffect(() => {
    getDelegationProvidersRequest(delegationNetworkProvider).then((p) => setProviders(p))
    getDelegationInfoRequest(delegationNetworkProvider, app.config.entity.address).then((d) => setDelegations(d))
  }, [])

  return (
    <>
      <_OverviewSection app={app} delegations={delegations} className="mb-4" />
      <_ActiveDelegationsSection app={app} providers={providers} delegations={delegations} className="mb-4" />
      <_DelegateSection app={app} providers={providers} className="mb-4" />
    </>
  )
}
