import { Itheum } from './Itheum'
import Logo from './meta/logo.svg'
import type { App } from '../../src/types'

export const ItheumApp: App  = {
  Enabled: true,
  Name: 'Itheum Data Dex',
  Description: 'Truly own and trade your data.',
  Website: 'https://www.itheum.io',
  Logo: Logo,
  Tags: ['exchange'],
  AppRoot: Itheum,
  Developer: {
    Name: 'Superciety',
    Website: 'https://superciety.com',
  }
}
