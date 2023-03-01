import { DaoExtension } from './dao/register'
import { XBulkExtension } from './xbulk/register'
import { ItheumExtension } from './itheum/register'
import { CoindripExtension } from './coindrip/register'
import { XExchangeExtension } from './xexchange/register'
import { ExtensionConfig, ExtensionInfo } from './_shared/types'

export const Config = (config: ExtensionConfig) => ({
  Extensions: [
    // Register at the end of the list
    DaoExtension(config),
    XExchangeExtension(config),
    CoindripExtension(config),
    ItheumExtension(config),
    XBulkExtension(config),
  ],

  KnowledgeBase: {
    Extensions: 'https://know.peerme.io/developers/extensions.html',
  },
})

export const findExtensionByContract = (
  config: ExtensionConfig,
  address: string,
  endpoint?: string
): ExtensionInfo | null =>
  Config(config).Extensions.find((extension) =>
    Object.values(extension.Contracts).some((contract) => {
      if (contract.Address === address) {
        return endpoint ? contract.Endpoint === endpoint : true
      }
      return false
    })
  ) || null
