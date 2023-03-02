import BigNumber from 'bignumber.js'
import { TokenPayment } from '@multiversx/sdk-core'
import { ExtensionConfig, ExtensionInfo } from './types'
import { ProposalAction, ProposalActionArg, toProposalActionPayment } from '@peerme/core-ts'

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
