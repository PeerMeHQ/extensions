import { Config } from '../../config'
import React, { useMemo } from 'react'
import { ExtensionConfig } from '../types'
import { toAppContextValue } from '../helpers'
import { Transaction } from '@multiversx/sdk-core'
import { AppContext } from '../contexts/AppContext'

type Props = {
  config: ExtensionConfig
  onUserActionRequest?: (tx: Transaction) => void
}

export const WidgetDashboardPresenter = (props: Props) => {
  const applicable = useMemo(findApplicableWidgets(props.config), [props.config])

  if (applicable.length === 0) return null

  return (
    <section>
      <ul>
        {applicable.map((extension) =>
          extension.WidgetRoots.Dashboard ? (
            <li key={extension.Name}>
              <AppContext.Provider
                value={toAppContextValue(props.config, extension, undefined, props.onUserActionRequest)}
              >
                <extension.WidgetRoots.Dashboard config={props.config} />
              </AppContext.Provider>
            </li>
          ) : null
        )}
      </ul>
    </section>
  )
}

const findApplicableWidgets = (config: ExtensionConfig) => () =>
  Config(config)
    .Extensions.filter((e) => e.Enabled || config.hasEarlyAccess)
    .filter((e) => e.Tags.some((t) => config.entity.tags.includes(t)))
    .filter((e) => e.WidgetRoots.Dashboard !== null)
