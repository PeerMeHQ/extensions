import React from 'react'
import Image from 'next/image'
import { ExtensionInfo, ExtensionConfig } from '../types'

type Props = {
  config: ExtensionConfig
  extension: ExtensionInfo
  className?: string
  size?: number
}

export const _AppLogo = (props: Props) => {
  if (props.config.dark) {
    return typeof props.extension.Logo.Dark === 'string' ? (
      <Image
        src={props.extension.Logo.Dark}
        alt={props.extension.Name + ' Logo'}
        className={props.className}
        width={props.size}
        height={props.size}
        unoptimized
      />
    ) : (
      <props.extension.Logo.Dark className={props.className} width={props.size} height={props.size} />
    )
  }

  return typeof props.extension.Logo.Light === 'string' ? (
    <Image
      src={props.extension.Logo.Light}
      alt={props.extension.Name + ' Logo'}
      className={props.className}
      width={props.size}
      height={props.size}
      unoptimized
    />
  ) : (
    <props.extension.Logo.Light className={props.className} width={props.size} height={props.size} />
  )
}
