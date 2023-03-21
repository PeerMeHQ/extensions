import React from 'react'
import Image from 'next/image'
import BigNumber from 'bignumber.js'
import { ProposalAction } from '@peerme/core-ts'
import { ExtensionConfig, ExtensionInfo } from '../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

type Props = {
  config: ExtensionConfig
  extension: ExtensionInfo
  action: ProposalAction
  className?: string
}

export const ActionPreview = (props: Props) => {
  const hasValue = !new BigNumber(props.action.value).isZero()
  const hasPayment = props.action.payments.length > 0

  const scInfo = Object.values(props.extension.Contracts)
    .filter((c) => c.Address === props.action.destination)
    .filter((c) => c.Endpoint === props.action.endpoint)[0]

  const showRawTransaction = () => alert(JSON.stringify(props.action, null, 2))

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
              width={50}
              height={50}
              unoptimized
            />
          ) : (
            <Image
              src={props.extension.Logo.Light}
              alt={props.extension.Name + ' Logo'}
              className="inline-block w-6 sm:w-8 md:w-10"
              width={50}
              height={50}
              unoptimized
            />
          )}
          <span className="inline-block ml-1">{props.extension.Name}</span>
        </a>
        {!!scInfo?.ActionPreview && (
          <span className="text-gray-600 dark:text-gray-400">
            <span> to </span>
            {scInfo?.ActionPreview?.(props.action)}
          </span>
        )}
      </h3>
      {hasValue && (
        <span className="block pl-4 text-sm text-yellow-600 dark:text-yellow-500 mb-4">
          <FontAwesomeIcon icon={faInfoCircle} className="inline-block mr-1 opacity-80" />
          This action is transferring EGLD.
        </span>
      )}
      {hasPayment && (
        <span className="block pl-4 text-sm text-yellow-600 dark:text-yellow-500 mb-4">
          <FontAwesomeIcon icon={faInfoCircle} className="inline-block mr-1 opacity-80" />
          This action is transferring tokens.
        </span>
      )}
      <button onClick={showRawTransaction} className="block text-blue-500 hover:text-blue-400">
        View Raw Transaction
      </button>
    </div>
  )
}
