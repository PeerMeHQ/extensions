import React from 'react'
import { ExtensionConfig, ExtensionInfo } from '../types'

type Props = {
  config: ExtensionConfig
  app: ExtensionInfo
  onClick: (app: ExtensionInfo) => void
}

export const _AppSelectorItem = (props: Props) => (
  <button
    type="button"
    onClick={() => props.onClick(props.app)}
    className="flex gap-4 text-left px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
  >
    <img
      src={props.config.dark ? props.app.Logo.Light : props.app.Logo.Dark}
      alt={props.app.Name + ' Logo'}
      className="w-10 sm:w-12 md:w-16"
    />
    <div>
      <h3>{props.app.Name}</h3>
      <p className="mb-1">{props.app.Description}</p>
      {props.app.Tags.length > 0 && (
        <ul role="list" className="flex gap-2">
          {props.app.Tags.map((tag) => (
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
