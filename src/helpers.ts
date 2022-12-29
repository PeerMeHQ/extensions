import BigNumber from 'bignumber.js'
import { TokenPayment } from '@elrondnetwork/erdjs'
import { ProposalAction, ProposalActionArg, toProposalActionPayment } from '@peerme/core-ts'

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
