import React from 'react'
import { AppHook } from '../../../shared/hooks/useApp'
import { AppSection } from '../../../shared/ui/elements'
import { DelegationInfo, DelegationProvider } from './types'
import { _ActiveDelegationRow } from './delegation/_ActiveDelegationRow'

type Props = {
  app: AppHook
  providers: DelegationProvider[]
  delegations: DelegationInfo[]
  className?: string
}

export const _ActiveDelegationsSection = (props: Props) => {
  return (
    <AppSection title="Our Delegations" className={props.className}>
      <table className="min-w-full">
        <thead className="block bg-gray-200 dark:bg-gray-700 rounded-t-xl rounded-b">
          <tr className="flex w-full">
            <th
              scope="col"
              className="flex-grow px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Provider
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Staked
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reward
            </th>
          </tr>
        </thead>
        <tbody className="block divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto">
          {props.delegations.map((delegation) => (
            <_ActiveDelegationRow
              key={delegation.contract}
              app={props.app}
              delegation={delegation}
              provider={findProvider(props.providers, delegation.contract)}
            />
          ))}
        </tbody>
      </table>
    </AppSection>
  )
}

const findProvider = (providers: DelegationProvider[], contract: string) =>
  providers.find((provider) => provider.contract === contract) || null
