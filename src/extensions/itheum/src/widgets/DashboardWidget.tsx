import clsx from 'clsx'
import { Config } from '../config'
import { CoalitionInfo } from '../types'
import { Contracts } from '../contracts'
import { Staker } from '../coalition/Staker'
import { useScQuery } from '@peerme/core-ts'
import { toTypedCoalitionInfo } from '../helpers'
import React, { useEffect, useState } from 'react'
import { Delegator } from '../coalition/Delegator'
import { StickyModal, Theme } from '@peerme/web-ui'
import { Withdrawer } from '../coalition/Withdrawer'
import { useApp } from '../../../../shared/hooks/useApp'
import { WidgetRootProps } from '../../../../shared/types'

export function DashboardWidget(props: WidgetRootProps) {
  const app = useApp()
  const [info, setInfo] = useState<CoalitionInfo | null>(null)
  const [isDelegating, setIsDelegating] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const infoQuery = useScQuery(props.config.walletConfig, Contracts(props.config).GetInfo)

  useEffect(() => {
    infoQuery.query([app.config.entity.address, app.config.user?.address]).then((data) => {
      const value = data.firstValue?.valueOf()
      if (!value) return
      setInfo(toTypedCoalitionInfo(value))
    })
  }, [app.config.user])

  return (
    <section>
      <h2 className={clsx(Theme.TextSize.Large)}>Data Coalition</h2>
      <p className="mb-2">
        This Peering is a Data Coalition utilizing the{' '}
        <a href={Config.Urls.Web} target="_blank" rel="noopener">
          Itheum
        </a>{' '}
        protocol.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className={clsx('px-4 py-2', Theme.Background.Subtle, Theme.BorderRadius.Subtle)}>
          <h3 className={clsx('mb-2', Theme.TextSize.Base)}>My Data</h3>
          <div className="flex flex-col lg:flex-row gap-2">
            <_Button onClick={() => setIsDelegating(true)}>Provide</_Button>
            <_Button onClick={() => setIsDelegating(true)} inverted>
              View
            </_Button>
          </div>
          <StickyModal open={isDelegating} onClose={() => setIsDelegating(false)}>
            {!!info && <Delegator info={info} />}
          </StickyModal>
        </div>
        <div className={clsx('px-4 py-2', Theme.Background.Subtle, Theme.BorderRadius.Subtle)}>
          <h3 className={clsx('mb-2', Theme.TextSize.Base)}>Stake {info?.nativeToken.split('-')[0]}</h3>
          <div className="flex flex-col lg:flex-row gap-2">
            <_Button onClick={() => setIsStaking(true)}>Stake</_Button>
            {!!info && !info.userStake.isZero() && (
              <_Button onClick={() => setIsWithdrawing(true)} inverted>
                Withdraw
              </_Button>
            )}
          </div>
          <StickyModal open={isStaking} onClose={() => setIsStaking(false)}>
            {!!info && <Staker info={info} />}
          </StickyModal>
          <StickyModal open={isWithdrawing} onClose={() => setIsWithdrawing(false)}>
            {!!info && <Withdrawer info={info} />}
          </StickyModal>
        </div>
        <div className={clsx('px-4 py-2', Theme.Background.Subtle, Theme.BorderRadius.Subtle)}>
          <h3 className={clsx('mb-1', Theme.TextSize.Base)}>Data Providers</h3>
          <strong className={clsx(Theme.TextSize.Huge, Theme.TextColor.Intense)}>
            {info?.delegators !== undefined ? info.delegators : '-'}
          </strong>
        </div>
        <div className={clsx('px-4 py-2', Theme.Background.Subtle, Theme.BorderRadius.Subtle)}>
          <h3 className={clsx('mb-2', Theme.TextSize.Base)}>Data Categories</h3>
          <strong className={clsx(Theme.TextSize.Huge, Theme.TextColor.Intense)}>
            {info?.categories !== undefined ? info.categories.length : '-'}
          </strong>
        </div>
      </div>
    </section>
  )
}

function _Button(props: { children: string; onClick: () => void; inverted?: boolean }) {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className={clsx(
        'w-full duration-400 relative flex items-center justify-center rounded-xl px-3 py-1 text-lg transition',
        props.inverted
          ? 'text-blue-500 hover:text-blue-400 dark:bg-gray-700 dark:hover:bg-gray-200'
          : 'bg-blue-500 tracking-wide text-white hover:bg-blue-600'
      )}
    >
      {props.children}
    </button>
  )
}
