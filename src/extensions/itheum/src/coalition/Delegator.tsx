import clsx from 'clsx'
import collect from 'collect.js'
import { fetchDataNftsOfAccount } from '../api'
import React, { useEffect, useState } from 'react'
import { ScInfo, useScQuery } from '@peerme/core-ts'
import { useApp } from '../../../../shared/hooks/useApp'
import { Button, Select, SelectOption, Theme } from '@peerme/web-ui'
import { Contracts, getCoalitionContractAddress } from '../contracts'
import { toTypedAggregatorAppInfo, toTypedAggregatorDelegation } from '../helpers'
import { AggregatorAppInfo, AggregatorDelegation, CoalitionInfo, DataNftMetadata } from '../types'
import {
  Address,
  BytesValue,
  Interaction,
  AddressValue,
  TokenTransfer,
  SmartContract,
  ContractFunction,
} from '@multiversx/sdk-core'

type Props = {
  info: CoalitionInfo
  className?: string
}

export function Delegator(props: Props) {
  const app = useApp()
  const [appInfo, setAppInfo] = useState<AggregatorAppInfo | null>(null)
  const [selected, setSelected] = useState<Record<string, DataNftMetadata[]>>({})
  const [delegations, setDelegations] = useState<AggregatorDelegation[]>([])
  const [userCollections, setUserCollections] = useState<Record<string, DataNftMetadata[]>>({})
  const [category, setCategory] = useState<string | null>(null)

  const appInfoScInfo: ScInfo = { ...Contracts(app.config).GetAppInfo, Address: props.info.aggregator }
  const appInfoScQuery = useScQuery(app.config.walletConfig, appInfoScInfo)

  const delegationsScInfo: ScInfo = { ...Contracts(app.config).GetDelegationsByUser, Address: props.info.aggregator }
  const delegationsQuery = useScQuery(app.config.walletConfig, delegationsScInfo)

  // fetch aggregator data
  useEffect(() => {
    if (!app.config.user) return
    appInfoScQuery.query([props.info.aggregatorApp]).then((data) => {
      const value = data.firstValue?.valueOf()
      if (!value) return
      setAppInfo(toTypedAggregatorAppInfo(value))
    })
    delegationsQuery.query([props.info.aggregatorApp, app.config.user.address]).then((data) => {
      setDelegations(data.firstValue?.valueOf()?.map(toTypedAggregatorDelegation) || [])
    })
  }, [app.config.user])

  useEffect(() => {
    if (!appInfo) return
    fetchDataNftsOfAccount(app, appInfo?.dataCollections).then((data) => {
      setUserCollections(collect(data).groupBy('collection').all() as any)
    })
  }, [appInfo])

  const toggleSelected = (nft: DataNftMetadata) => {
    if (!selected[nft.collection]) {
      setSelected({ ...selected, [nft.collection]: [nft] })
    } else if (isSelected(nft)) {
      setSelected({ ...selected, [nft.collection]: selected[nft.collection].filter((d) => d.nonce !== nft.nonce) })
    } else {
      setSelected({ ...selected, [nft.collection]: [...selected[nft.collection], nft] })
    }
  }

  const isSelected = (nft: DataNftMetadata) => !!selected[nft.collection]?.find((d) => d.nonce === nft.nonce)

  const handleDelegate = () => {
    if (!app.config.user || !category || !Object.keys(selected).length) return
    const amount = 1 // default for NFTs, and for SFTs only 1 is allowed since data stream is equal
    const nfts = Object.values(selected).flat(1)
    const transferables = nfts.map((nft) => TokenTransfer.semiFungible(nft.collection, nft.nonce, amount))
    const contract = new SmartContract({ address: Address.fromBech32(getCoalitionContractAddress(app.config.network)) })
    const tx = new Interaction(contract, new ContractFunction('grantAccess'), [
      new AddressValue(Address.fromBech32(app.config.entity.address)),
      BytesValue.fromUTF8(category),
    ])
      .withChainID(app.config.walletConfig.ChainId)
      .withSender(new Address(app.config.user.address))
      .withGasLimit(50_000_000)
      .withMultiESDTNFTTransfer(transferables)
      .buildTransaction()
    app.requestUserAction(tx)
  }

  return (
    <div className={props.className}>
      <h2 className="mb-2">Delegate Data to {app.config.entity.name}</h2>
      <p className="mb-4">Grant access to the Data Coalition to use your data. You can revoke access at any time.</p>
      <ul className="space-y-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
        {Object.entries(userCollections).map(([collection, nfts]) => (
          <li key={collection} className={clsx('px-6 py-4', Theme.Background.Subtle, Theme.BorderRadius.Subtle)}>
            <h3 className="mb-2">
              <span>{collection.split('-')[0]}</span>
              <span className="text-base opacity-60">-{collection.split('-')[1]}</span>
            </h3>
            <ul className="flex flex-wrap gap-2">
              {nfts.map((nft) => (
                <li key={nft.nonce}>
                  <_Delegatable nft={nft} selected={isSelected(nft)} onClick={() => toggleSelected(nft)} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {Object.keys(selected).length > 0 && (
        <div className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="category"
              className="mb-2 pl-1 text-base sm:text-lg text-gray-800 dark:text-gray-200 md:text-xl"
            >
              Category
            </label>
            <Select
              id="category"
              options={toCategoryOptions(props.info.categories)}
              onSelect={(val) => setCategory(val)}
            />
          </div>
          <Button color="blue" onClick={handleDelegate} className="block w-full" disabled={!category}>
            Delegate
          </Button>
        </div>
      )}
    </div>
  )
}

function _Delegatable(props: { nft: DataNftMetadata; delegated?: boolean; selected?: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={props.onClick}>
      <img
        src={props.nft.nftImgUrl}
        alt={props.nft.title}
        className={clsx(
          'duration-400 h-16 w-16 transform rounded-lg transition active:translate-y-1 cursor-pointer hover:shadow-lg',
          props.delegated ? 'opacity-50 grayscale' : '',
          props.selected ? 'shadow-xl' : 'opacity-40 shadow-inner'
        )}
      />
    </button>
  )
}

const toCategoryOptions = (categories: string[]): SelectOption[] => {
  const options = categories.map((category) => ({
    value: category,
    name: category,
  }))

  return [{ value: '-', name: 'Select Category' }, ...options]
}
