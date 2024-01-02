import { Config } from './config'
import { decodeNftMetadata, toNftId } from './helpers'
import { AppContextValue } from '../../../shared/types'
import { NonFungibleTokenOfAccountOnNetwork } from '@multiversx/sdk-network-providers'

export const fetchDataNft = async (app: AppContextValue, collectionId: string, nonce: number) => {
  const url = `nfts/${toNftId(collectionId, nonce)}`
  const res = await app.networkProvider.doGetGeneric(url)

  let nft = NonFungibleTokenOfAccountOnNetwork.fromApiHttpResponse(res) as any
  nft.rawResponse = res // TODO: remove once merged: https://github.com/multiversx/mx-sdk-js-network-providers/pull/38

  return nft
}

export const fetchDataNftsOfAccount = async (app: AppContextValue, customCollections: string[] = []) => {
  const defaultCollection = Config.DataNftCollection(app.config.network)
  const collections = [defaultCollection, ...customCollections]

  const res: any[] = await app.networkProvider.doGetGeneric(
    `accounts/${app.config.entity.address}/nfts?size=10000&collections=${collections.join(',')}&withSupply=true`
  )

  const nftMintAbiRes = await fetch(Config.Abis.DataNft)
  const nftMintAbiContent = await nftMintAbiRes.json()

  return res
    .map((item) => {
      let nft = NonFungibleTokenOfAccountOnNetwork.fromApiHttpResponse(item) as any
      nft.rawResponse = item // TODO: remove once merged: https://github.com/multiversx/mx-sdk-js-network-providers/pull/38
      return nft
    })
    .map((item) => decodeNftMetadata(nftMintAbiContent, item))
}

export const fetchDataNftsByIds = async (app: AppContextValue, tokenIds: string[]) => {
  if (!tokenIds.length) return Promise.resolve([])
  const url = `nfts?withSupply=true&identifiers=${tokenIds.join(',')}`
  const res: any[] = await app.networkProvider.doGetGeneric(url)

  const nftMintAbiRes = await fetch(Config.Abis.DataNft)
  const nftMintAbiContent = await nftMintAbiRes.json()

  return res
    .map((item) => {
      let nft = NonFungibleTokenOfAccountOnNetwork.fromApiHttpResponse(item) as any
      nft.rawResponse = item // TODO: remove once merged: https://github.com/multiversx/mx-sdk-js-network-providers/pull/38
      return nft
    })
    .map((item) => decodeNftMetadata(nftMintAbiContent, item))
}
