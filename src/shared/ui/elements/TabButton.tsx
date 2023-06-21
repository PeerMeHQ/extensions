import React from 'react'
import { Tab } from '@headlessui/react'
import { classNames } from '@peerme/core-ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type Props = {
  icon: IconDefinition
  children: string
  className?: string
}

export const TabButton = (props: Props) => (
  <Tab>
    {({ selected }) => (
      <button
        className={classNames(
          'flex-1 sm:flex-initial',
          'inline-flex flex-col sm:flex-row items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl text-lg focus:outline-none',
          selected
            ? 'text-primary-400 shadow-inner bg-gray-200 dark:bg-gray-700'
            : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:bg-gray-800 transition duration-300',
          props.className
        )}
      >
        <div className="hidden sm:inline-block sm:mr-2">
          <FontAwesomeIcon
            icon={props.icon}
            className={classNames('text-lg', selected ? 'opacity-75' : 'opacity-40')}
          />
        </div>
        <span className="inline-block sm:hidden sm:mr-2">
          <FontAwesomeIcon
            icon={props.icon}
            className={classNames('text-xl', selected ? 'opacity-75' : 'opacity-40')}
          />
        </span>
        <span className="sr-only">{props.children}</span>
        <span className="hidden sm:inline-block">{props.children}</span>
      </button>
    )}
  </Tab>
)
