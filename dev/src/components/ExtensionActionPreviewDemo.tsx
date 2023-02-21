import { useState } from 'react'
import * as Extensions from '../../../src/index'
import { ScInfo, trimHash } from '@peerme/core-ts'
import { Select, SelectOption } from '@peerme/web-ui'

type Props = {
  config: Extensions.ExtensionConfig
  extension: Extensions.ExtensionInfo
}

export const ExtensionActionPreviewDemo = (props: Props) => {
  const available = Object.values(props.extension.Contracts)
  const [selected, setSelected] = useState(toActionSelectOptions(available)[0]?.value)
  const selectedAction = available[parseInt(selected || '0')]

  if (available.length === 0) return null

  return (
    <div>
      <header className="mb-4">
        <h3 className="text-lg font-bold mb-2">Settings</h3>
        <Select value={selected} options={toActionSelectOptions(available)} onSelect={(val) => setSelected(val)} />
      </header>
      <Extensions.ExtensionActionPreview
        config={props.config}
        extension={props.extension}
        action={{
          destination: selectedAction.Address,
          endpoint: selectedAction.Endpoint,
          value: 0,
          payments: [],
          arguments: [],
          guards: [],
        }}
      />
    </div>
  )
}

const toActionSelectOptions = (actions: ScInfo[]): SelectOption[] =>
  actions.map((a, i) => ({ value: i.toString(), name: `${trimHash(a.Address, 4)} - ${a.Endpoint}` } as SelectOption))
