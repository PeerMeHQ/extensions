import { DevServerConfig } from './config'
import { AccountType } from '@multiversx/sdk-dapp/types'
import { ProposalAction, toActionArgsBigInt } from '@peerme/core-ts'
import { Address, Interaction, SmartContract, TokenTransfer, ContractFunction } from '@multiversx/sdk-core'

const GasLimit = 50_000_000

export const toDemoTransaction = (action: ProposalAction, account: AccountType) => {
  console.log('Creating transaction for action', action, 'with account', account)

  const sc = new SmartContract({ address: Address.fromBech32(action.destination) })
  const typedArgs = action.arguments.map(transformActionArgToTypedValue)

  console.log('Actions [serialized]', toSerializableAction(action, GasLimit))

  let interaction = new Interaction(sc, new ContractFunction(action.endpoint), typedArgs)
    .withChainID(DevServerConfig.ChainId)
    .withSender(new Address(account.address))
    .withGasLimit(GasLimit)
    .withNonce(account.nonce)
    .withValue(action.value)

  if (action.payments.length === 1) {
    const payment = action.payments[0]
    const tokenTransfer = TokenTransfer.metaEsdtFromBigInteger(
      payment.tokenId,
      payment.tokenNonce,
      toActionArgsBigInt(payment.amount),
      payment.tokenDecimals!
    )
    const isFungible = payment.tokenNonce === 0

    interaction = isFungible
      ? interaction.withSingleESDTTransfer(tokenTransfer)
      : interaction.withSingleESDTNFTTransfer(tokenTransfer)
  } else if (action.payments.length > 1) {
    const tokenTransfer = action.payments.map((p) =>
      TokenTransfer.metaEsdtFromBigInteger(p.tokenId, p.tokenNonce, toActionArgsBigInt(p.amount), p.tokenDecimals!)
    )
    interaction = interaction.withMultiESDTNFTTransfer(tokenTransfer)
  }

  return interaction.buildTransaction()
}
