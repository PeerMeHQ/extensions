import React, { useState } from 'react'
import { CoalitionInfo } from '../types'
import { Contracts } from '../contracts'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'
import { capitalizeFirstLetter } from '@peerme/core-ts'
import { Button, Input } from '@peerme/web-ui'

type Props = {
  info: CoalitionInfo
  className?: string
}

export function _CategoriesSection(props: Props) {
  const app = useApp()
  const [name, setName] = useState('')

  const handleAdd = () =>
    app.requestProposalAction(
      Contracts(app.config).AddCategory.Address,
      Contracts(app.config).AddCategory.Endpoint,
      0,
      [name],
      []
    )

  const handleRemove = (name: string) =>
    app.requestProposalAction(
      Contracts(app.config).RemoveCategory.Address,
      Contracts(app.config).RemoveCategory.Endpoint,
      0,
      [name],
      []
    )

  return (
    <div className={props.className}>
      <AppSection
        title="Create Category"
        description="Data Providers can delegate their data to existing categories."
        className="mb-4"
      >
        <Input placeholder="Category name ..." value={name} onChange={(val) => setName(val)} />
        {name.length > 0 && (
          <Button onClick={handleAdd} color="blue" className="mt-4">
            Create
          </Button>
        )}
      </AppSection>
      <AppSection title="Our Categories">
        <ul>
          {props.info.categories.map((category) => (
            <li key={category} className="flex items-center justify-between">
              <span>{capitalizeFirstLetter(category)}</span>
              <button onClick={() => handleRemove(category)}>Remove</button>
            </li>
          ))}
        </ul>
      </AppSection>
    </div>
  )
}
