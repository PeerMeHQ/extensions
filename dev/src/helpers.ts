import { DevServerConfig } from './config'
import { AccountType } from '@multiversx/sdk-dapp/types'
import { ProposalAction, toActionArgsTypedValue, toActionArgsBigNumber } from '@peerme/core-ts'
import { Address, ContractFunction, Interaction, SmartContract, TokenTransfer } from '@multiversx/sdk-core'

export const toDemoTransaction = (action: ProposalAction, account: AccountType) => {
  console.log('Creating transaction for action', action, 'with account', account)

  const sc = new SmartContract({ address: Address.fromBech32(action.destination) })
  const typedArgs = action.arguments.map(toActionArgsTypedValue)

  let interaction = new Interaction(sc, new ContractFunction(action.endpoint), typedArgs)
    .withChainID(DevServerConfig.ChainId)
    .withSender(new Address(account.address))
    .withGasLimit(50_000_000)
    .withNonce(account.nonce)
    .withValue(action.value)

  if (action.payments.length === 1) {
    const payment = action.payments[0]
    const tokenTransfer = TokenTransfer.metaEsdtFromBigInteger(
      payment.tokenId,
      payment.tokenNonce,
      toActionArgsBigNumber(payment.amount),
      payment.tokenDecimals!
    )
    const isFungible = payment.tokenNonce === 0

    interaction = isFungible
      ? interaction.withSingleESDTTransfer(tokenTransfer)
      : interaction.withSingleESDTNFTTransfer(tokenTransfer)
  } else if (action.payments.length > 1) {
    const tokenTransfer = action.payments.map((p) =>
      TokenTransfer.metaEsdtFromBigInteger(p.tokenId, p.tokenNonce, toActionArgsBigNumber(p.amount), p.tokenDecimals!)
    )
    interaction = interaction.withMultiESDTNFTTransfer(tokenTransfer)
  }

  return interaction.buildTransaction()
}
