import React from 'react'
import { classNames } from '@superciety/core-ts'

type Props = {
  children: any
  title?: string
  className?: string
}

export const AppSection = (props: Props) => (
  <section
    className={classNames(
      'px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800',
      props.className
    )}
  >
    {!!props.title && <h2 className="text-xl mb-4">{props.title}</h2>}
    {props.children}
  </section>
)
