import { ExtensionConfig, ExtensionInfo } from './shared/types'
import { DaoExtension } from './extensions/entity/register'
import { XBulkExtension } from './extensions/xbulk/register'
import { HatomExtension } from './extensions/hatom/register'
import { ItheumExtension } from './extensions/itheum/register'
import { StakingExtension } from './extensions/staking/register'
import { AshSwapExtension } from './extensions/ashswap/register'
import { CoindripExtension } from './extensions/coindrip/register'
import { LunarPayExtension } from './extensions/lunarpay/register'
import { Sense4fitExtension } from './extensions/sense4fit/register'
import { XExchangeExtension } from './extensions/xexchange/register'
import { ArtCpaClubExtension } from './extensions/artcpaclub/register'
import { PulsarMoneyExtension } from './extensions/pulsarmoney/register'

export const Config = (config: ExtensionConfig) => ({
  Extensions: [
    // Register at the end of the list
    DaoExtension(config),
    StakingExtension(config),
    XExchangeExtension(config),
    CoindripExtension(config),
    ItheumExtension(config),
    XBulkExtension(config),
    PulsarMoneyExtension(config),
    HatomExtension(config),
    AshSwapExtension(config),
    Sense4fitExtension(config),
    ArtCpaClubExtension(config),
    LunarPayExtension(config),
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
