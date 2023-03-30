import { Config } from './config'
import { decodeNftMetadata, toNftId } from './helpers'
import { AppContextValue } from '../../../shared/types'
import { NonFungibleTokenOfAccountOnNetwork } from '@multiversx/sdk-network-providers'

export const fetchDataNfts = async (app: AppContextValue, collectionId: string, nonce: number) => {
  const url = `nfts/${toNftId(collectionId, nonce)}`
  const res = await app.networkProvider.doGetGeneric(url)

  let nft = NonFungibleTokenOfAccountOnNetwork.fromApiHttpResponse(res) as any
  nft.rawResponse = res // TODO: remove once merged: https://github.com/multiversx/mx-sdk-js-network-providers/pull/38

  return nft
}

export const fetchDataNftsOfAccount = async (app: AppContextValue) => {
  const collection = Config.DataNftCollection(app.config.network)
  const url = `accounts/${app.config.entity.address}/nfts?size=10000&collections=${collection}&withSupply=true`
  const res: any[] = await app.networkProvider.doGetGeneric(url)

  return res
    .map((item) => {
      let nft = NonFungibleTokenOfAccountOnNetwork.fromApiHttpResponse(item) as any
      nft.rawResponse = item // TODO: remove once merged: https://github.com/multiversx/mx-sdk-js-network-providers/pull/38
      return nft
    })
    .map((item) => decodeNftMetadata(item))
}

export const fetchDataNftsByIds = async (app: AppContextValue, tokenIds: string[]) => {
  if (!tokenIds.length) return Promise.resolve([])
  const url = `nfts?withSupply=true&identifiers=${tokenIds.join(',')}`
  const res: any[] = await app.networkProvider.doGetGeneric(url)

  return res
    .map((item) => {
      let nft = NonFungibleTokenOfAccountOnNetwork.fromApiHttpResponse(item) as any
      nft.rawResponse = item // TODO: remove once merged: https://github.com/multiversx/mx-sdk-js-network-providers/pull/38
      return nft
    })
    .map((item) => decodeNftMetadata(item))
}
