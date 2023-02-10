import { DaoExtension } from './extensions/dao/register'
import { XBulkExtension } from './extensions/xbulk/register'
import { ItheumExtension } from './extensions/itheum/register'
import { CoindripExtension } from './extensions/coindrip/register'

export const Config = {
  Extensions: [
    // Register at the end of the list
    DaoExtension,
    CoindripExtension,
    ItheumExtension,
    XBulkExtension,
  ],
}
