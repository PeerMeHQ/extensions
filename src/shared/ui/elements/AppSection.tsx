import React from 'react'
import { classNames } from '@peerme/core-ts'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  children: any
  title?: string
  className?: string
  onCloseRequest?: () => void
}

export const AppSection = (props: Props) => (
  <section className={classNames('px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800', props.className)}>
    {props.onCloseRequest ? (
      <button
        onClick={props.onCloseRequest}
        type="button"
        className="text-2xl text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700 rounded-xl px-4 py-2 transition duration-300"
      >
        <FontAwesomeIcon icon={faAngleLeft} className="inline-block mr-2 text-blue-500 text-xl" />
        {!!props.title && <span>{props.title}</span>}
      </button>
    ) : props.title ? (
      <h2 className="text-xl mb-4">{props.title}</h2>
    ) : null}
    {props.children}
  </section>
)
