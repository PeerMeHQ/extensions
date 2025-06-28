import { Address, SmartContractTransactionsFactory, TransactionsFactoryConfig } from '@multiversx/sdk-core'
import { AccountType } from '@multiversx/sdk-dapp/types'
import { ProposalAction, toTokenPaymentFromProposalPayment } from '@peerme/core-ts'
import { WarpArgSerializer } from '@vleap/warps'
import { DevServerConfig } from './config'

const GasLimit = 50_000_000

export const toDemoTransaction = (action: ProposalAction, account: AccountType) => {
  console.log('Creating transaction for action', action)
  const was = new WarpArgSerializer()
  const config = new TransactionsFactoryConfig({ chainID: DevServerConfig.ChainId })
  const sender = Address.newFromBech32(account.address)

  const tx = new SmartContractTransactionsFactory({ config }).createTransactionForExecute(sender, {
    contract: Address.newFromBech32(action.destination),
    function: action.endpoint!,
    gasLimit: BigInt(GasLimit),
    arguments: action.arguments.map(was.stringToTyped),
    tokenTransfers: action.payments.map(toTokenPaymentFromProposalPayment),
    nativeTransferAmount: BigInt(action.value),
  })

  return tx
}
