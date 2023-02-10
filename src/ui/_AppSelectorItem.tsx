import React from 'react'
import { toExtensionName } from '../helpers'
import { ExtensionConfig, ExtensionInfo } from '../types'

type Props = {
  config: ExtensionConfig
  extension: ExtensionInfo
  onClick: (app: ExtensionInfo) => void
}

export const _AppSelectorItem = (props: Props) => (
  <button
    type="button"
    onClick={() => props.onClick(props.extension)}
    className="flex gap-4 text-left px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
  >
    {props.config.dark ? (
      <img src={props.extension.Logo.Dark} alt={props.extension.Name + ' Logo'} className="w-10 sm:w-12 md:w-16" />
    ) : (
      <img src={props.extension.Logo.Light} alt={props.extension.Name + ' Logo'} className="w-10 sm:w-12 md:w-16" />
    )}
    <div>
      <h3>{toExtensionName(props.config, props.extension)}</h3>
      <p className="mb-1">{props.extension.Description}</p>
      {props.extension.Tags.length > 0 && (
        <ul role="list" className="flex gap-2">
          {props.extension.Tags.map((tag) => (
            <li className={tag}>
              <span className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-0.5 text-sm text-gray-600">
                {'#' + tag}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </button>
)
