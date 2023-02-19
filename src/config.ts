import { ExtensionConfig } from './types'
import { DaoExtension } from './extensions/dao/register'
import { XBulkExtension } from './extensions/xbulk/register'
import { ItheumExtension } from './extensions/itheum/register'
import { CoindripExtension } from './extensions/coindrip/register'
import { XExchangeExtension } from './extensions/xexchange/register'

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
