import { Config } from '../config'
import { BigNumber } from 'bignumber.js'
import { Contracts } from '../contracts'
import { TokenTransfer } from '@multiversx/sdk-core'
import { DataNftMetadata, OfferInfo } from '../types'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppContextValue } from '../../../../shared/types'
import React, { SyntheticEvent, useMemo, useState } from 'react'
import { Button, Input, Dialog, TextBadge } from '@peerme/web-ui'
import { Constants, toFormattedTokenAmount } from '@peerme/core-ts'

type Props = {
  offer: OfferInfo
  nft: DataNftMetadata
}

export function _Procurer(props: Props) {
  const app = useApp()
  const [isOpen, setIsOpen] = useState(false)
  const [quantity, setQuantity] = useState('1')
  const wantedAmount = props.offer.wantedTokenAmount.multipliedBy(+quantity || 1)
  const wantsEgld = props.offer.wantedTokenIdentifier == Constants.EgldTokenIdentifier
  const isFree = wantedAmount.isZero()

  const wantedTokenDecimals = useMemo(() => getWantedTokenDecimals(app, props.offer), [props.offer])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (+quantity > +props.offer.quantity || +quantity <= 0) {
      app.showToast('Invalid quantity', 'error')
      return
    }
    const contract = Contracts(app.config).AcceptOffer
    const value = wantsEgld ? wantedAmount : 0
    const tokenTransfers =
      wantsEgld || isFree ? [] : [toWantedTokenTransfer(props.offer, wantedAmount, wantedTokenDecimals)]

    app.requestProposalAction(contract.Address, contract.Endpoint, value, [props.offer.id, +quantity], tokenTransfers)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} color="blue">
        Procure
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <ul className="list-none text-gray-900 dark:text-gray-100 text-xl bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2 mb-4">
            <li>
              Listed: <strong>{props.offer.quantity}</strong>
            </li>
            <li>
              Total supply: <strong>{props.nft.supply.toFixed()}</strong>
            </li>

            {isFree ? (
              <li className="py-2">
                <TextBadge color="indigo">Free</TextBadge>
              </li>
            ) : (
              <li>
                Price:{' '}
                <strong>
                  {toFormattedTokenAmount(wantedAmount, 18)}{' '}
                  {props.offer.wantedTokenIdentifier === Config.TokenId(app.config.env)
                    ? Config.TokenName
                    : props.offer.wantedTokenIdentifier}
                </strong>
              </li>
            )}
          </ul>
          <label htmlFor="quantity" className="pl-1 text-xl mb-2 text-gray-800 dark:text-gray-200">
            How many do you want to procure?
          </label>
          <Input
            id="quantity"
            placeholder="Quantity"
            value={quantity}
            onChange={(val) => setQuantity(val)}
            className="mb-4"
          />
          <Button color="blue" type="submit" className="block w-full">
            Add Procure Action to Proposal
          </Button>
        </form>
      </Dialog>
    </>
  )
}

const getWantedTokenDecimals = (app: AppContextValue, offer: OfferInfo) => {
  if (offer.wantedTokenIdentifier == Constants.EgldTokenIdentifier) return Constants.EgldDecimals
  if (offer.wantedTokenIdentifier == Config.TokenId(app.config.env)) return Config.TokenDecimals
  return 0
}

const toWantedTokenTransfer = (offer: OfferInfo, amount: BigNumber.Value, tokenDecimals: number) =>
  TokenTransfer.metaEsdtFromBigInteger(offer.wantedTokenIdentifier, offer.wantedTokenNonce, amount, tokenDecimals)
