import { ApiNetworkProvider, TokenTransfer, Transaction, TypedValue } from '@multiversx/sdk-core'
import { ProposalAction, createAction } from '@peerme/core-ts'
import { showToast as showAppToast } from '@peerme/web-ui'
import { AppToastType, ExtensionConfig, ExtensionInfo } from './types'

export const toExtensionName = (config: ExtensionConfig, extension: ExtensionInfo) =>
  extension.Name.replace(':entityName', config.entity.name)

export const toAppContextValue = (
  config: ExtensionConfig,
  extension: ExtensionInfo,
  onActionAddRequest?: (action: ProposalAction) => void,
  onUserActionRequest?: (tx: Transaction) => void
) => {
  const networkProvider = new ApiNetworkProvider(config.network.urls.api, {
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
    value: bigint,
    args: TypedValue[] = [],
    transfers: TokenTransfer[] = []
  ) => {
    const action = createAction(destination, endpoint || '', value, args, transfers)
    console.log(`[App Extension: ${extension.Name}] requests dao action:`, action)
    onActionAddRequest?.(action)
  }

  /**
   * Requests a direct proposal action.
   *
   * @param {ProposalAction} action - The proposal action to request.
   */
  const requestDirectProposalAction = (action: ProposalAction) => {
    console.log(`[App Extension: ${extension.Name}] requests direct dao action:`, action)
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
    requestDirectProposalAction,
    requestUserAction,
    showToast,
  }
}
