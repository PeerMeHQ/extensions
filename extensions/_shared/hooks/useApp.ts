import BigNumber from 'bignumber.js'
import { createProposalAction } from '../helpers'
import { TokenPayment } from '@elrondnetwork/erdjs'
import { ProposalActionArg } from '@peerme/core-ts'
import { ExtensionConfig, AppRootProps } from '../types'
import { showToast as showAppToast } from '@peerme/web-ui'

type ToastType = 'success' | 'info' | 'warning' | 'error' | 'vibe'

export type AppHook = {
  config: ExtensionConfig
  requestProposalAction: (
    destination: string,
    endpoint: string | null,
    value: BigNumber.Value,
    args: ProposalActionArg[],
    payments: TokenPayment[]
  ) => void
  showToast: (text: string, type?: ToastType) => void
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

  const showToast = (text: string, type?: ToastType) => {
    console.log(`[App] ${type}: ${text}`)
    showAppToast(text, type)
  }

  return {
    config: appProps.config,
    requestProposalAction,
    showToast,
  }
}
