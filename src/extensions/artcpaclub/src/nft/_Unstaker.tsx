import BigNumber from 'bignumber.js'
import { Contracts } from '../contracts'
import { Button, Input } from '@peerme/web-ui'
import { sanitizeNumeric } from '@peerme/core-ts'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'
import { NftPool, NftPoolOnChain, StakedNftInfo } from '../types'
import React, { SyntheticEvent, useEffect, useState } from 'react'

type Props = {
  pool: NftPool
  poolOnChain: NftPoolOnChain
  className?: string
}

export function _Unstaker(props: Props) {
  const app = useApp()
  const [unstakableInfo, setUnstakableInfo] = useState<StakedNftInfo | null>(null)
  const [nfts, setNfts] = useState<any[]>([])
  const [amount, setAmount] = useState('0')

  useEffect(() => {
    const identifiers = props.poolOnChain.user_stake_amount_per_nonce
      .map((nft) => `${props.pool.stake_token_id}-${nonceToHex(nft.nonce)}`)
      .join(',')

    app.networkProvider.doGetGeneric(`nfts?size=500&identifiers=${identifiers}`).then((data) => setNfts(data))
  }, [props.poolOnChain.user_stake_amount_per_nonce])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const amountBig = new BigNumber(amount)
    app.requestProposalAction(
      Contracts(app.config).NftUserUnstake.Address,
      Contracts(app.config).NftUserUnstake.Endpoint,
      0,
      [props.pool.pool_id, amountBig],
      []
    )
  }

  return (
    <AppSection title="Unstake" className={props.className}>
      {unstakableInfo === null ? (
        <ul className="flex gap-4">
          {props.poolOnChain.user_stake_amount_per_nonce.map((unstakableInfo) => (
            <li key={unstakableInfo.nonce}>
              <_UnstakablePreview
                onClick={() => setUnstakableInfo(unstakableInfo)}
                unstakableInfo={unstakableInfo}
                nft={nfts.find((n) => n.nonce === unstakableInfo.nonce)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <button onClick={() => setUnstakableInfo(null)} className="text-blue-500 dark:text-blue-400">
              {'< Go back'}
            </button>
          </div>
          <label htmlFor="amount" className="mb-2 pl-1 text-xl text-gray-800 dark:text-gray-200">
            Unstake Amount
          </label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(val) => setAmount(sanitizeNumeric(val))}
              className="mb-2"
              autoComplete="off"
            />
            {+amount !== unstakableInfo.amount && (
              <div className="absolute bottom-1/2 right-4 translate-y-1/2 transform">
                <button
                  type="button"
                  onClick={() => setAmount(unstakableInfo.amount.toString())}
                  className="rounded-xl bg-gray-800 px-3 py-1 uppercase text-gray-100 shadow-lg transition duration-300 hover:bg-gray-900"
                >
                  Max
                </button>
              </div>
            )}
          </div>
          <Button color="blue" className="block w-full" disabled={+amount === 0} submit>
            Add Unstake Action
          </Button>
        </form>
      )}
    </AppSection>
  )
}

function _UnstakablePreview(props: { onClick: () => void; unstakableInfo: StakedNftInfo; nft: any }) {
  if (!props.nft) return null

  return (
    <button onClick={props.onClick}>
      <img src={props.nft.media[0].url} alt={props.nft.name} className="block mb-1 w-16 h-16 rounded-xl" />
      <strong className="block text-center text-gray-800 dark:text-gray-100">{props.unstakableInfo.amount}</strong>
    </button>
  )
}

export const nonceToHex = (nonce: any) => {
  const hexString = nonce.toString(16)
  return hexString.length % 2 ? '0' + hexString : hexString
}
