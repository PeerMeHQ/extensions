import { Config } from './config'
import { decodeNftMetadata } from './helpers'
import { AppContextValue } from '../../../shared/types'
import { NonFungibleTokenOfAccountOnNetwork } from '@multiversx/sdk-network-providers'

export const fetchDataNftsOfAccount = async (app: AppContextValue) => {
  const collection = Config.DataNftCollection(app.config.network)
  const url = `accounts/${app.config.entity.address}/nfts?size=10000&collections=${collection}&withSupply=true`
  const response: any[] = await app.networkProvider.doGetGeneric(url)

  return response
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
  const response: any[] = await app.networkProvider.doGetGeneric(url)

  return response
    .map((item) => {
      let nft = NonFungibleTokenOfAccountOnNetwork.fromApiHttpResponse(item) as any
      nft.rawResponse = item // TODO: remove once merged: https://github.com/multiversx/mx-sdk-js-network-providers/pull/38
      return nft
    })
    .map((item) => decodeNftMetadata(item))
}
