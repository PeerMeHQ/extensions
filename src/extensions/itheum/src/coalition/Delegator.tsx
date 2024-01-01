import clsx from 'clsx'
import collect from 'collect.js'
import { fetchDataNftsOfAccount } from '../api'
import { ScInfo, useScQuery } from '@peerme/core-ts'
import React, { useEffect, useState } from 'react'
import { toTypedAggregatorAppInfo } from '../helpers'
import { useApp } from '../../../../shared/hooks/useApp'
import { Select, SelectOption, Theme } from '@peerme/web-ui'
import { Contracts, getCoalitionContractAddress } from '../contracts'
import { AggregatorAppInfo, CoalitionInfo, DataNftMetadata } from '../types'
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
  const [collections, setCollections] = useState<Record<string, DataNftMetadata[]>>({})
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
      const value = data.firstValue?.valueOf()
      console.log('user delegations', value)
    })
  }, [app.config.user])

  useEffect(() => {
    if (!appInfo) return
    fetchDataNftsOfAccount(app, appInfo?.dataCollections).then((data) => {
      setCollections(collect(data).groupBy('collection').all() as any)
    })
  }, [appInfo])

  const handleDelegate = (delegatables: TokenTransfer[]) => {
    if (!app.config.user || !category) return
    const contract = new SmartContract({ address: Address.fromBech32(getCoalitionContractAddress(app.config.network)) })
    const tx = new Interaction(contract, new ContractFunction('grantAccess'), [
      new AddressValue(Address.fromBech32(app.config.entity.address)),
      BytesValue.fromUTF8(category),
    ])
      .withChainID(app.config.walletConfig.ChainId)
      .withSender(new Address(app.config.user.address))
      .withGasLimit(10_000_000)
      .withMultiESDTNFTTransfer(delegatables)
      .buildTransaction()
    app.requestUserAction(tx)
  }

  return (
    <div className={props.className} style={{ maxHeight: '80vh' }}>
      <h2 className="mb-2">Delegate Data to {app.config.entity.name}</h2>
      <p className="mb-4">Grant access to the Data Coalition to use your data. You can revoke access at any time.</p>
      <ul className="space-y-4">
        {Object.entries(collections).map(([collection, nfts]) => (
          <li key={collection} className={clsx('px-6 py-4', Theme.Background.Subtle, Theme.BorderRadius.Subtle)}>
            <h3 className="mb-2">
              <span>{collection.split('-')[0]}</span>
              <span className="text-base opacity-60">-{collection.split('-')[1]}</span>
            </h3>
            <ul className="flex flex-wrap gap-2">
              {nfts.map((nft) => (
                <li key={nft.nonce}>
                  <button onClick={() => handleDelegate([TokenTransfer.semiFungible(nft.collection, nft.nonce, 1)])}>
                    <img
                      src={nft.nftImgUrl}
                      alt={nft.title}
                      className={clsx(
                        'duration-400 h-16 w-16 transform rounded-lg transition active:translate-y-1 cursor-pointer hover:shadow-lg',
                        false /* delegated */ ? '' : 'opacity-50 grayscale',
                        false /* selected */ ? 'shadow-xl' : 'opacity-25 shadow-inner'
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
            <div>
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
          </li>
        ))}
      </ul>
    </div>
  )
}

const toCategoryOptions = (categories: string[]): SelectOption[] =>
  categories.map((category) => ({
    value: category,
    name: category,
  }))
