import React, { useMemo } from 'react'
import { DelegationInfo } from '../types'
import { toEgldDisplayAmount } from '../helpers'
import { AppSection } from '../../../../shared/ui/elements'

type Props = {
  delegations: DelegationInfo[]
  className?: string
}

export const OverviewSection = (props: Props) => {
  const activeStake = useMemo(
    () => props.delegations.reduce((carry, item) => carry + item.userActiveStake, 0n),
    [props.delegations]
  )

  const claimableRewards = useMemo(
    () => props.delegations.reduce((carry, item) => carry + item.claimableRewards, 0n),
    [props.delegations]
  )

  return (
    <AppSection title="Overview" className={props.className}>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
        <li className="col-span-1">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-6 py-4">
            <h2 className="text-base mb-1">Our Stake</h2>
            <strong className="font-head text-4xl text-primary-500 dark:text-primary-400">
              {toEgldDisplayAmount(activeStake)}
            </strong>
          </div>
        </li>
        <li className="col-span-1">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-6 py-4">
            <h2 className="text-base mb-1">Claimable Rewards</h2>
            <strong className="block font-head text-4xl text-primary-500 dark:text-primary-400">
              {toEgldDisplayAmount(claimableRewards)}
            </strong>
          </div>
        </li>
      </ul>
    </AppSection>
  )
}
