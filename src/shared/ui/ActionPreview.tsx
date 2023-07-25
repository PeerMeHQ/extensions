import React from 'react'
import BigNumber from 'bignumber.js'
import { _AppLogo } from './_AppLogo'
import { ExtensionConfig, ExtensionInfo } from '../types'
import { classNames, ProposalAction } from '@peerme/core-ts'
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
    <div className={classNames('space-y-4', props.className)}>
      <div>
        <h3 className="inline text-xl sm:text-2xl text-gray-800 dark:text-gray-200 text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-400">
          Use App{' '}
          <a
            href={props.extension.Website}
            target="_blank"
            rel="noopener nofollow noreferrer"
            className="hover:text-blue-400 transition duration-200"
          >
            <_AppLogo config={props.config} extension={props.extension} className="w-10 sm:w-12 md:w-14" size={50} />
            <span className="inline-block ml-1">{props.extension.Name}</span>
          </a>
        </h3>
        {!!scInfo?.ActionPreview && (
          <span className="text-gray-600 dark:text-gray-400">
            <span className="text-xl sm:text-2xl font-head"> to </span>
            {scInfo?.ActionPreview?.(props.action)}
          </span>
        )}
      </div>
      {hasValue && (
        <span className="block pl-4 text-sm text-yellow-600 dark:text-yellow-500">
          <FontAwesomeIcon icon={faInfoCircle} className="inline-block mr-1 opacity-80" />
          This action is transferring EGLD.
        </span>
      )}
      {hasPayment && (
        <span className="block pl-4 text-sm text-yellow-600 dark:text-yellow-500">
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
