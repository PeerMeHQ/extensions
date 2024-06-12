import { Config } from '../config'
import { Contracts } from '../contracts'
import { Button, Input } from '@peerme/web-ui'
import { TokenTransfer } from '@multiversx/sdk-core'
import React, { SyntheticEvent, useState } from 'react'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'
import { sanitizeNumeric, shiftBigint } from '@peerme/core-ts'
import { DataNftMetadata, MarketRequirements } from '../types'

type Props = {
  nft: DataNftMetadata
  marketRequirements: MarketRequirements | null
}

export function _MarketListSection(props: Props) {
  const app = useApp()
  const [amount, setAmount] = useState('1')
  const [price, setPrice] = useState('10')
  const minAmountForSeller = 0 // Ref: https://github.com/Itheum/data-dex/blob/4011a3660637e10fed0bdd5d7e92a50c5ff56627/src/MultiversX/dataNftMarket.ts#L229
  const totalPrice = +amount * +price

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const addOfferScInfo = Contracts(app.config).AddOffer
    const paymentTokenId = Config.TokenId(app.config.env)
    const paymentTokenNonce = 0
    const priceBig = shiftBigint(price, Config.TokenDecimals)
    app.requestProposalAction(
      addOfferScInfo.Address,
      addOfferScInfo.Endpoint,
      0n,
      [paymentTokenId, paymentTokenNonce, priceBig, minAmountForSeller, +amount],
      [TokenTransfer.semiFungible(props.nft.collection, props.nft.nonce, +amount)]
    )
  }

  return (
    <AppSection title="List on Marketplace">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="pl-1 text-xl mb-2 text-gray-800 dark:text-gray-200">
            How many do you want to list?
          </label>
          <Input
            id="amount"
            placeholder="amount"
            type="number"
            value={amount}
            onChange={(val) => setAmount(sanitizeNumeric(val))}
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="pl-1 text-xl mb-2 text-gray-800 dark:text-gray-200">
            For how much?
          </label>
          <Input
            id="price"
            placeholder="price"
            type="number"
            value={price}
            onChange={(val) => setPrice(sanitizeNumeric(val))}
            required
            autoComplete="off"
          />
        </div>
        <ul className="text-gray-700 dark:text-gray-200 text-lg pl-2 mb-8">
          {!!props.marketRequirements && (
            <li>
              Seller Tax (per NFT): <strong>{props.marketRequirements.sellerFee / 100}%</strong>
            </li>
          )}
        </ul>
        <Button color="blue" className="block w-full" type="submit">
          List {amount} NFT for {totalPrice} {Config.TokenName}
        </Button>
      </form>
    </AppSection>
  )
}
