import React from 'react'
import { classNames } from '@peerme/core-ts'

type Props = {
  children: any
  className?: string
}

export const ActionPreviewHighlight = (props: Props) => (
  <p className={classNames('inline-block text-2xl font-head', props.className)}>{props.children}</p>
)
