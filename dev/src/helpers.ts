import { DevServerConfig } from './config'
import { AccountType } from '@multiversx/sdk-dapp/types'
import { ProposalAction, toActionArgsTypedValue } from '@peerme/core-ts'
import { Address, ContractFunction, Interaction, SmartContract } from '@multiversx/sdk-core'

export const toDemoTransaction = (action: ProposalAction, account: AccountType) => {
  console.log('Creating transaction for action', action, 'with account', account)

  const sc = new SmartContract({ address: Address.fromBech32(action.destination) })
  const typedArgs = action.arguments.map(toActionArgsTypedValue)

  return new Interaction(sc, new ContractFunction(action.endpoint), typedArgs)
    .withChainID(DevServerConfig.ChainId)
    .withGasLimit(50_000_000)
    .withNonce(account.nonce)
    .withValue(action.value)
    .buildTransaction()
}
