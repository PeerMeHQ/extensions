import clsx from 'clsx'
import { Config } from '../config'
import { CoalitionInfo } from '../types'
import { Staker } from '../coalition/Staker'
import { useScQuery } from '@peerme/core-ts'
import { toTypedCoalitionInfo } from '../helpers'
import React, { useEffect, useState } from 'react'
import { StickyModal, Theme } from '@peerme/web-ui'
import { Withdrawer } from '../coalition/Withdrawer'
import { WidgetRootProps } from '../../../../shared/types'
import { Contracts, getCoalitionContractAddress } from '../contracts'

export function DashboardWidget(props: WidgetRootProps) {
  const [info, setInfo] = useState<CoalitionInfo | null>(null)
  const [isDelegating, setIsDelegating] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const infoQuery = useScQuery(props.config.walletConfig, Contracts(props.config).GetInfo)

  useEffect(() => {
    infoQuery.query([getCoalitionContractAddress(props.config.network)]).then((data) => {
      const value = data.firstValue?.valueOf()
      if (!value) return
      setInfo(toTypedCoalitionInfo(value))
    })
  }, [])

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
          <h3 className={clsx('mb-2', Theme.TextSize.Base)}>My Data NFTs</h3>
          <_Button onClick={() => setIsDelegating(true)} inverted>
            View
          </_Button>
          <StickyModal open={isDelegating} onClose={() => setIsDelegating(false)}>
            <p>Coming soon</p>
          </StickyModal>
        </div>
        <div className={clsx('px-4 py-2', Theme.Background.Subtle, Theme.BorderRadius.Subtle)}>
          <h3 className={clsx('mb-2', Theme.TextSize.Base)}>Stake {info?.nativeToken.split('-')[0]}</h3>
          <_Button onClick={() => setIsStaking(true)} inverted>
            Stake
          </_Button>
          {!!info && !info.userStake.isZero() && (
            <_Button onClick={() => setIsWithdrawing(true)} inverted>
              Withdraw
            </_Button>
          )}
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
        'duration-400 relative inline-flex items-center justify-center rounded-xl px-3 py-1 text-lg transition',
        props.inverted
          ? 'text-blue-500 hover:text-blue-400 dark:bg-gray-700 dark:hover:bg-gray-200'
          : 'bg-blue-500 tracking-wide text-white hover:bg-blue-600'
      )}
    >
      {props.children}
    </button>
  )
}
