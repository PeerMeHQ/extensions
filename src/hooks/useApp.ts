import BigNumber from 'bignumber.js'
import { createProposalAction } from '../helpers'
import { AppConfig, AppRootProps } from '../types'
import { TokenPayment } from '@elrondnetwork/erdjs'
import { ProposalActionArg } from '@superciety/core-ts'

export type AppHook = {
  config: AppConfig
  requestProposalAction: (
    destination: string,
    endpoint: string | null,
    value: BigNumber.Value,
    args: ProposalActionArg[],
    payments: TokenPayment[]
  ) => void
}

export const useApp = (appProps: AppRootProps): AppHook => {
  /**
   * Creates a proposal action request.
   *
   * @param {string} destination - The destination smart contract address.
   * @param {string | null} endpoint - The name of the endpoint to call on the destination smart contract.
   * @param {BigNumber.Value} value - The amount of EGLD to send.
   * @param {ProposalActionArg[]} args - The arguments to pass to the smart contract endpoint.
   * @param {TokenPayment[]} payments - The payments to send to the smart contract endpoint.
   */
  const requestProposalAction = (
    destination: string,
    endpoint: string | null,
    value: BigNumber.Value,
    args: ProposalActionArg[] = [],
    payments: TokenPayment[] = []
  ) => appProps.onActionAddRequest(createProposalAction(destination, endpoint, value, args, payments))

  return {
    config: appProps.config,
    requestProposalAction,
  }
}
