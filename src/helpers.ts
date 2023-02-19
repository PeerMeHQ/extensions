import { Config } from './config'
import BigNumber from 'bignumber.js'
import { TokenPayment } from '@elrondnetwork/erdjs'
import { ExtensionConfig, ExtensionInfo } from './types'
import { ProposalAction, ProposalActionArg, toProposalActionPayment } from '@peerme/core-ts'

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

export const toExtensionName = (config: ExtensionConfig, extension: ExtensionInfo) =>
  extension.Name.replace(':entityName', config.entity.name)

export const createProposalAction = (
  destination: string,
  endpoint: string | null,
  value: BigNumber.Value,
  args: ProposalActionArg[] = [],
  payments: TokenPayment[] = []
): ProposalAction => ({
  destination,
  endpoint: endpoint || '',
  value,
  arguments: args,
  payments: payments.map(toProposalActionPayment),
  guards: [],
})
