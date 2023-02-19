import React from 'react'
import { toExtensionName } from '../helpers'
import { ProposalAction } from '@peerme/core-ts'
import { ExtensionInfo, ExtensionConfig } from '../types'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  config: ExtensionConfig
  extension: ExtensionInfo
  onCloseRequest: () => void
  onActionAddRequest: (action: ProposalAction) => void
}

export const _AppPresenter = (props: Props) => (
  <div>
    <header className="mb-4">
      <button
        onClick={props.onCloseRequest}
        type="button"
        className="text-2xl text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700 rounded-xl px-4 py-2 transition duration-300"
      >
        <FontAwesomeIcon icon={faAngleLeft} className="inline-block mr-2 text-blue-500 text-xl" />
        <span>{toExtensionName(props.config, props.extension)}</span>
      </button>
    </header>
    <div className="mb-2">{!!props.extension.AppRoot && <props.extension.AppRoot {...props} />}</div>
    <footer className="px-4">
      <small className="text-sm text-gray-500">
        This app is maintained by{' '}
        <a
          href={props.extension.Developer.Website}
          target="_blank"
          rel="noopener nofollow"
          className="text-blue-500 hover:text-blue-600 hover:cursor-pointer"
          style={{ border: 0 }}
        >
          {props.extension.Developer.Name}
        </a>
        .
      </small>
    </footer>
  </div>
)
