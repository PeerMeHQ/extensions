import BigNumber from 'bignumber.js'
import { showToast as showAppToast } from '@peerme/web-ui'
import { TokenTransfer, Transaction } from '@multiversx/sdk-core'
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers'
import { AppToastType, ExtensionConfig, ExtensionInfo } from './types'
import { ProposalAction, ProposalActionArg, createAction } from '@peerme/core-ts'

export const toExtensionName = (config: ExtensionConfig, extension: ExtensionInfo) =>
  extension.Name.replace(':entityName', config.entity.name)

export const toAppContextValue = (
  config: ExtensionConfig,
  extension: ExtensionInfo,
  onActionAddRequest?: (action: ProposalAction) => void,
  onUserActionRequest?: (tx: Transaction) => void
) => {
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
   * @param {TokenTransfer[]} transfers - The payments to send to the smart contract endpoint.
   */
  const requestProposalAction = (
    destination: string,
    endpoint: string | null,
    value: BigNumber.Value,
    args: ProposalActionArg[] = [],
    transfers: TokenTransfer[] = []
  ) => {
    const action = createAction(destination, endpoint || '', value, args, transfers)
    console.log(`[App Extension: ${extension.Name}] requests dao action:`, action)
    onActionAddRequest?.(action)
  }

  /**
   * Creates a user action request.
   *
   * @param {Transaction} tx - The transaction to send.
   */
  const requestUserAction = (tx: Transaction) => {
    console.log(`[App Extension: ${extension.Name}] requests user action:`, tx.toPlainObject())
    onUserActionRequest?.(tx)
  }

  const showToast = (text: string, type?: AppToastType) => {
    console.log(`[App Extension: ${extension.Name}] alerts ${type}:`, text)
    showAppToast(text, type)
  }

  return {
    config,
    networkProvider,
    requestProposalAction,
    requestUserAction,
    showToast,
  }
}
