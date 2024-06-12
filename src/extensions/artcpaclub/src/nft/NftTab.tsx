import { Config } from '../config'
import { _Staker } from './_Staker'
import { Input } from '@peerme/web-ui'
import { _Unstaker } from './_Unstaker'
import { Contracts } from '../contracts'
import React, { useEffect, useState } from 'react'
import { toTypedNftPoolOnChain } from '../helpers'
import { NftPoolOnChain, NftPool } from '../types'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppContextValue } from '../../../../shared/types'
import { AppSection } from '../../../../shared/ui/elements'
import { toFormattedTokenAmount, useScQuery } from '@peerme/core-ts'

export function NftTab() {
  const app = useApp()
  const [poolUrl, setPoolUrl] = useState('')
  const [poolId, setPoolId] = useState<number | null>(null)
  const [selectedPool, setSelectedPool] = useState<any | null>(null)
  const [selectedPoolOnChain, setSelectedPoolOnChain] = useState<NftPoolOnChain | null>(null)
  const poolScQuery = useScQuery(app.config.walletConfig, Contracts(app.config).NftViewPool)

  useEffect(() => {
    if (!poolUrl) return
    const match = poolUrl.match(/\/staking\/nft\/(\d+)/)
    if (match && match[1] !== undefined) {
      setPoolId(parseInt(match[1]))
    } else {
      app.showToast('Invalid pool URL', 'error')
      setPoolUrl('')
    }
  }, [poolUrl])

  useEffect(() => {
    if (poolId === null) return
    fetch(Config.ApiBaseUrl(app.config.env) + '/nftstaking/' + poolId).then(async (res) => {
      const data = (await res.json()) as NftPool
      setSelectedPool(data)
      poolScQuery.query([data.pool_id, app.config.entity.address]).then((data) => {
        const poolData = data.firstValue?.valueOf() || {}
        setSelectedPoolOnChain(toTypedNftPoolOnChain(poolData))
      })
    })
  }, [poolId])

  return selectedPool === null ? (
    <AppSection title="Paste the link of a Pool">
      <label htmlFor="starting_date" className="pl-1 text-xl mb-2 text-gray-800 dark:text-gray-200">
        Link to NFT Staking Pool
      </label>
      <Input
        placeholder="https://marketplace.artcpaclub.com/nft/token/x"
        value={poolUrl}
        onChange={(val) => setPoolUrl(val)}
      />
    </AppSection>
  ) : (
    <>
      {!!selectedPool && <_PoolInfo app={app} pool={selectedPool} />}
      {!!selectedPool && !!selectedPoolOnChain && (
        <_PoolOnChainInfo app={app} pool={selectedPool} poolOnChain={selectedPoolOnChain} />
      )}
      <_Staker pool={selectedPool} className="mb-4" />
      {!!selectedPoolOnChain && selectedPoolOnChain.user_stake_amount.isGreaterThan(0) && (
        <_Unstaker pool={selectedPool} poolOnChain={selectedPoolOnChain} className="mb-4" />
      )}
    </>
  )
}

function _PoolInfo(props: { app: AppContextValue; pool: NftPool }) {
  return (
    <a
      href={Config.MarketplaceUrl(props.app.config.env) + '/staking/token/' + props.pool.pool_id}
      target="_blank"
      rel="noopener"
      className="flex px-6 py-3 bg-gray-200 dark:bg-gray-800 rounded-xl mb-4"
    >
      <div className="flex-grow text-left">
        <h3 className="text-lg text-black dark:text-white mb-2">{props.pool.title}</h3>
        <ul className="text-base text-gray-500 dark:text-gray-400 list-disc pl-4">
          <li>
            Stake Token: <strong>{props.pool.stake_token_id}</strong>
          </li>
          <li>
            Reward Token: <strong>{props.pool.reward_token_id}</strong>
          </li>
        </ul>
      </div>
    </a>
  )
}

function _PoolOnChainInfo(props: { app: AppContextValue; pool: NftPool; poolOnChain: NftPoolOnChain }) {
  const handleRewardClaim = () =>
    props.app.requestProposalAction(
      Contracts(props.app.config).NftUserClaim.Address,
      Contracts(props.app.config).NftUserClaim.Endpoint,
      0,
      [props.pool.pool_id],
      []
    )

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none mb-4">
      <li className="col-span-1">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl px-6 py-4">
          <h2 className="text-base mb-1">Our Stake</h2>
          <strong className="font-head text-4xl text-primary-500 dark:text-primary-400">
            {props.poolOnChain.user_stake_amount.toNumber()}
          </strong>
        </div>
      </li>
      <li className="col-span-1">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl px-6 py-4">
          <h2 className="text-base mb-1">Claimable Rewards</h2>
          <strong className="block font-head text-4xl text-primary-500 dark:text-primary-400">
            {toFormattedTokenAmount(props.poolOnChain.user_reward_amount, props.pool.reward_token_decimal)}
          </strong>
          {props.poolOnChain.user_reward_amount.isGreaterThan(0) && (
            <button onClick={handleRewardClaim} className="text-blue-500">
              Claim Rewards
            </button>
          )}
        </div>
      </li>
    </ul>
  )
}
