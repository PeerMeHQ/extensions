import React from 'react'

type Props = {
  children: any
}

export const ActionPreviewHighlight = (props: Props) => (
  <span className="inline text-xl sm:text-2xl font-head">{props.children}</span>
)
