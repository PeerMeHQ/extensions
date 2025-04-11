import { Aggregator } from '@ashswap/ash-sdk-js/out'
import { Address, TokenTransfer } from '@multiversx/sdk-core/out'
import { Constants, ProposalAction, createAction } from '@peerme/core-ts'
import { Button, EntityTransferSelector, Select } from '@peerme/web-ui'
import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'
import { getAshswapChainId } from '../helpers'
import { AshswapToken } from '../types'

const DefaultSlippage = 100 // 1% = 1_000

export function SwapTab() {
  const app = useApp()
  const aggregator = useMemo(
    () => new Aggregator({ chainId: getAshswapChainId(app.config.network.env) }),
    [app.config.network.env]
  )
  const [payment, setPayment] = useState<TokenTransfer | null>(null)
  const [availableTokens, setAvailableTokens] = useState<AshswapToken[]>([])
  const availableTokensSorted = useMemo(
    () => availableTokens.sort((a, b) => a.id.localeCompare(b.id)),
    [availableTokens]
  )
  const [seletedToken, setSelectedToken] = useState<string | null>(Constants.Egld.Id)
  const [computedAction, setComputedAction] = useState<ProposalAction | null>(null)

  useEffect(() => {
    aggregator.getTokens().then((tokens) => setAvailableTokens(tokens))
  }, [])

  useEffect(() => {
    if (!payment) return
    computeSwap()
  }, [payment?.tokenIdentifier, payment?.amountAsBigInteger.toString()])

  const computeSwap = async () => {
    if (!payment || !seletedToken) return
    const { getInteraction, sorResponse } = await aggregator.aggregate(
      payment.tokenIdentifier,
      seletedToken,
      payment.amountAsBigInteger.toNumber(),
      DefaultSlippage
    )
    const tx = await getInteraction(async (warning) => {
      console.log('aggregator swap warning', warning)
      return true
    }).catch(() => null)
    console.log('aggregator response', sorResponse, tx)
    if (!tx) return
    tx.withSender(new Address(app.config.entity.address)).buildTransaction()
    const contract = tx.getContractAddress().bech32()
    if (!contract) return
    const tokenTransfers = payment.isEgld() ? [] : [payment]
    const args = tx.getArguments() as any
    setComputedAction(
      createAction(contract, tx.getFunction().toString(), BigInt(tx.getValue().toString()), args, tokenTransfers)
    )
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!seletedToken) {
      app.showToast('Please select a target token', 'error')
      return
    }
    if (seletedToken === payment?.tokenIdentifier) {
      app.showToast('Source and target token must be different', 'error')
      return
    }
    if (!computedAction) return
    app.requestDirectProposalAction(computedAction)
  }

  return (
    <AppSection title="Swap">
      <form onSubmit={handleSubmit}>
        <EntityTransferSelector
          network={app.config.network}
          entity={app.config.entity}
          permissions={[]}
          onSelected={setPayment}
          skipTokenTypes={['nft']}
          className="mb-8"
        />
        <Select id="targetToken" onChange={setSelectedToken} className="mb-4">
          <option value={Constants.Egld.Id}>{Constants.Egld.DisplayName}</option>
          {availableTokensSorted.map((token) => (
            <option key={token.id} value={token.id}>
              {token.id.split('-')[0]} ({token.id})
            </option>
          ))}
        </Select>
        <Button color="blue" className="block w-full" type="submit">
          Add Swap Action
        </Button>
      </form>
    </AppSection>
  )
}
