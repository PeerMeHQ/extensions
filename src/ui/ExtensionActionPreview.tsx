import React from 'react'
import Image from 'next/image'
import BigNumber from 'bignumber.js'
import { ExtensionConfig, ExtensionInfo } from '../types'
import {
  trimHash,
  Constants,
  ProposalAction,
  ProposalActionArg,
  toFormattedVoteWeight,
  ProposalActionPayment,
  isValidBlockchainAddress,
} from '@peerme/core-ts'

type Props = {
  config: ExtensionConfig
  extension: ExtensionInfo
  action: ProposalAction
  className?: string
}

export const ExtensionActionPreview = (props: Props) => {
  const hasValue = !new BigNumber(props.action.value).isZero()
  const hasPayment = props.action.payments.length > 0

  const scInfo = Object.values(props.extension.Contracts)
    .filter((c) => c.Address === props.action.destination)
    .filter((c) => c.Endpoint === props.action.endpoint)[0]

  return (
    <div className={props.className}>
      <h3 className="text-2xl text-gray-800 dark:text-gray-200">
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-400">Use App</span>{' '}
        <a
          href={props.extension.Website}
          target="_blank"
          rel="noopener nofollow noreferrer"
          className="hover:text-blue-400 transition duration-200"
        >
          {props.config.dark ? (
            <Image
              src={props.extension.Logo.Dark}
              alt={props.extension.Name + ' Logo'}
              className="inline-block w-6 sm:w-8 md:w-10"
              unoptimized
            />
          ) : (
            <Image
              src={props.extension.Logo.Light}
              alt={props.extension.Name + ' Logo'}
              className="inline-block w-6 sm:w-8 md:w-10"
              unoptimized
            />
          )}
          {props.extension.Name}
        </a>
        {!!scInfo?.ActionPreview && (
          <>
            <span> to </span>
            {scInfo?.ActionPreview?.(props.action)}
          </>
        )}
      </h3>
      {props.action.arguments.length > 0 && (
        <span className="block mt-1 pl-4 text-lg text-gray-700 dark:text-gray-200 break-words">
          Arguments: <strong>{toDisplayableArguments(props.action.arguments)}</strong>
        </span>
      )}
      {hasValue && (
        <span className="block mt-1 pl-4 text-lg text-gray-700 dark:text-gray-200 break-words">
          Value: <strong>{toFormattedVoteWeight(props.action.value, Constants.EgldDecimals)} EGLD</strong>
        </span>
      )}
      {hasPayment && (
        <span className="block mt-1 pl-4 text-lg text-gray-700 dark:text-gray-200">
          Payments: <strong>{props.action.payments.map(toFormattedPayment).join(', ')}</strong>
        </span>
      )}
    </div>
  )
}

const toFormattedPayment = (payment: ProposalActionPayment) =>
  `${toFormattedVoteWeight(payment.amount, payment.tokenDecimals || 0)} ${payment.tokenId} ${
    payment.tokenNonce ? `(Nonce: ${payment.tokenNonce})` : ''
  }`

const toDisplayableArguments = (args: ProposalActionArg[]) =>
  args.map((arg) => (isValidBlockchainAddress(arg as string) ? trimHash(arg as string, 8) : arg)).join(', ')
