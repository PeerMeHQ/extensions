import { Config } from '../config'
import React, { useMemo } from 'react'
import { ExtensionConfig } from '../types'
import { _AppPresenter } from './_AppPresenter'
import { _AppSelectorItem } from './_AppSelectorItem'

type Props = {
  config: ExtensionConfig
}

export const WidgetInfoPresenter = (props: Props) => {
  const applicable = useMemo(findApplicableWidgets(props.config), [props.config])

  if (applicable.length === 0) return null

  return (
    <section>
      <span>Widgets found: {applicable.map((a) => a.Name).join(', ')}</span>
      <ul>
        {applicable.map((extension) =>
          extension.WidgetRoots.Info ? (
            <li key={extension.Name}>
              <extension.WidgetRoots.Info config={props.config} />
            </li>
          ) : null
        )}
      </ul>
    </section>
  )
}

const findApplicableWidgets = (config: ExtensionConfig) => () =>
  Config.Extensions.filter((e) => e.Enabled || config.hasEarlyAccess)
    .filter((e) => e.Tags.some((t) => config.entity.tags.includes(t)))
    .filter((e) => e.WidgetRoots.Info !== null)
