import { Itheum } from './Itheum'
import Logo from './meta/logo.svg'
import type { AppInfo } from '../../types'

export const ItheumApp: AppInfo = {
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
  },
}
