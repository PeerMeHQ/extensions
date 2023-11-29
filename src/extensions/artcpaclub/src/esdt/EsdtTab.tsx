import { Config } from '../config'
import { _Staker } from './_Staker'
import { EsdtPool } from '../types'
import { Input } from '@peerme/web-ui'
import { _Unstaker } from './_Unstaker'
import React, { useEffect, useState } from 'react'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'

export function EsdtTab() {
  const app = useApp()
  const [poolUrl, setPoolUrl] = useState('')
  const [poolId, setPoolId] = useState<number | null>(null)
  const [selectedPool, setSelectedPool] = useState<EsdtPool | null>(null)

  useEffect(() => {
    if (!poolUrl) return
    const match = poolUrl.match(/\/staking\/token\/(\d+)/)
    if (match) {
      setPoolId(parseInt(match[1]))
    } else {
      app.showToast('Invalid pool URL', 'error')
      setPoolUrl('')
    }
  }, [poolUrl])

  useEffect(() => {
    if (!poolId) return
    fetch(Config.Urls.ApiBase + '/tokenstaking/' + poolId).then(async (res) => {
      const data = await res.json()
      setSelectedPool(data)
    })
  }, [poolId])

  useEffect(() => {
    if (!poolUrl) return
    const match = poolUrl.match(/\/staking\/token\/(\d+)/)
    if (match) {
      setPoolId(parseInt(match[1]))
    } else {
      app.showToast('Invalid pool URL', 'error')
      setPoolUrl('')
    }
  }, [poolUrl])

  return selectedPool === null ? (
    <AppSection title="Paste the link of a Pool">
      <label htmlFor="starting_date" className="pl-1 text-xl mb-2 text-gray-800 dark:text-gray-200">
        Link to Staking Pool
      </label>
      <Input
        placeholder="https://marketplace.artcpaclub.com/staking/token/x"
        value={poolUrl}
        onChange={(val) => setPoolUrl(val)}
      />
    </AppSection>
  ) : (
    <>
      <a
        href={Config.Urls.Marketplace + '/staking/token/' + selectedPool.pool_id}
        target="_blank"
        rel="noopener"
        className="flex px-6 py-3 bg-gray-200 dark:bg-gray-800 rounded-xl mb-4"
      >
        <div className="flex-grow text-left">
          <h3 className="text-lg text-black dark:text-white">{selectedPool.title}</h3>
          <span className="text-sm text-gray-500">Token: {selectedPool.stake_token_id}</span>
        </div>
      </a>
      <_Staker pool={selectedPool} />
      <_Unstaker pool={selectedPool} />
    </>
  )
}
