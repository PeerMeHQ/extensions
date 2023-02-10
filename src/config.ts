import { ItheumExtension } from './extensions/itheum/register'
import { CoindripExtension } from './extensions/coindrip/register'

export const Config = {
  Extensions: [
    // Register your extension below
    CoindripExtension,
    ItheumExtension,
  ],
}
