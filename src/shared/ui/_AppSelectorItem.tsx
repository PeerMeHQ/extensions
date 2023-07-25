import React from 'react'
import { _AppLogo } from './_AppLogo'
import { toExtensionName } from '../helpers'
import { classNames } from '@peerme/core-ts'
import { ExtensionConfig, ExtensionInfo } from '../types'

type Props = {
  config: ExtensionConfig
  extension: ExtensionInfo
  onClick: (app: ExtensionInfo) => void
  className?: string
}

export const _AppSelectorItem = (props: Props) => (
  <button
    type="button"
    onClick={() => props.onClick(props.extension)}
    className={classNames(
      'flex gap-4 w-full text-left px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200',
      props.className
    )}
  >
    <div className="flex justify-center">
      <_AppLogo config={props.config} extension={props.extension} className="w-10 sm:w-12 md:w-14" size={50} />
    </div>
    <div>
      <h3>{toExtensionName(props.config, props.extension)}</h3>
      <p className="mb-1 text-base">{props.extension.Description}</p>
      {props.extension.Tags.length > 0 && (
        <ul role="list" className="flex gap-2">
          {props.extension.Tags.map((tag) => (
            <li key={tag}>
              <span className="inline-flex items-center rounded-lg bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-sm text-gray-600 dark:text-gray-300">
                {'#' + tag}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </button>
)
