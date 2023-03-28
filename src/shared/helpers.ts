import BigNumber from 'bignumber.js'
import { TokenPayment } from '@multiversx/sdk-core'
import { showToast as showAppToast } from '@peerme/web-ui'
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers'
import { AppToastType, ExtensionConfig, ExtensionInfo } from './types'
import { ProposalAction, ProposalActionArg, toProposalActionPayment } from '@peerme/core-ts'

export const toExtensionName = (config: ExtensionConfig, extension: ExtensionInfo) =>
  extension.Name.replace(':entityName', config.entity.name)

export const toAppContextValue = (config: ExtensionConfig, onActionAddRequest: (action: ProposalAction) => void) => {
  const networkProvider = new ApiNetworkProvider(config.walletConfig.ApiAddress, {
    timeout: 10_000,
  })

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
  ) =>
    onActionAddRequest({
      destination,
      endpoint: endpoint || '',
      value,
      arguments: args,
      payments: payments.map(toProposalActionPayment),
      guards: [],
    })

  const showToast = (text: string, type?: AppToastType) => {
    console.log(`[App] ${type}: ${text}`)
    showAppToast(text, type)
  }

  return {
    config,
    networkProvider,
    requestProposalAction,
    showToast,
  }
}
