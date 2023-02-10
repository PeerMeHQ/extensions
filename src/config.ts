import { DaoExtension } from './extensions/dao/register'
import { XBulkExtension } from './extensions/xbulk/register'
import { ItheumExtension } from './extensions/itheum/register'
import { CoindripExtension } from './extensions/coindrip/register'
import { XExchangeExtension } from './extensions/xexchange/register'

export const Config = {
  Extensions: [
    // Register at the end of the list
    DaoExtension,
    XExchangeExtension,
    CoindripExtension,
    ItheumExtension,
    XBulkExtension,
  ],
}
