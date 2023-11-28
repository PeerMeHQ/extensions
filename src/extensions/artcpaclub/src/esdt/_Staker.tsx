import { Config } from '../config'
import { EsdtPool } from '../types'
import { Contracts } from '../contracts'
import { TokenTransfer } from '@multiversx/sdk-core/out'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Button, EntityTransferSelector, Input } from '@peerme/web-ui'

export function _Staker() {
  const app = useApp()
  const [poolUrl, setPoolUrl] = useState('')
  const [poolId, setPoolId] = useState<number | null>(null)
  const [selectedPool, setSelectedPool] = useState<EsdtPool | null>(null)
  const [payment, setPayment] = useState<TokenTransfer | null>(null)
  const isSubmitDisabled = !poolId || !payment

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

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!poolId || !payment) return
    const value = payment.isEgld() ? payment.amountAsBigInteger : 0
    const tokenTransfers = payment.isEgld() ? [] : [payment]

    app.requestProposalAction(
      Contracts(app.config).UserStake.Address,
      Contracts(app.config).UserStake.Endpoint,
      value,
      [poolId],
      tokenTransfers
    )
  }

  return selectedPool === null ? (
    <div>
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
    </div>
  ) : (
    <div>
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
      <AppSection title="Stake now">
        <form onSubmit={handleSubmit}>
          <EntityTransferSelector
            config={app.config.walletConfig}
            entity={app.config.entity}
            permissions={[]}
            onSelected={(val) => setPayment(val)}
            tokenIdWhitelist={[selectedPool.stake_token_id]}
            className="mb-8"
          />
          <Button color="blue" className="block w-full" disabled={isSubmitDisabled} submit>
            Add Stake Action to Proposal
          </Button>
        </form>
      </AppSection>
    </div>
  )
}
