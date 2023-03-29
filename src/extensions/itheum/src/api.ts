import { Config } from './config'
import { decodeNftMetadata } from './helpers'
import { AppContextValue } from '../../../shared/types'
import { NonFungibleTokenOfAccountOnNetwork } from '@multiversx/sdk-network-providers'

export const fetchDataNftsOfAccount = async (app: AppContextValue) => {
  const collection = Config.DataNftCollection(app.config.network)
  const url = `accounts/${app.config.entity.address}/nfts?size=10000&collections=${collection}&withSupply=true`
  const response: any[] = await app.networkProvider.doGetGeneric(url)

  return response
    .map((item) => NonFungibleTokenOfAccountOnNetwork.fromApiHttpResponse(item))
    .map((item) => decodeNftMetadata(item))
}

export const fetchDataNftsByIds = async (app: AppContextValue, tokenIds: string[]) => {
  if (!tokenIds.length) return Promise.resolve([])
  const url = `nfts?withSupply=true&identifiers=${tokenIds.join(',')}`
  const response: any[] = await app.networkProvider.doGetGeneric(url)

  return response
    .map((item) => NonFungibleTokenOfAccountOnNetwork.fromApiHttpResponse(item))
    .map((item) => decodeNftMetadata(item))
}
