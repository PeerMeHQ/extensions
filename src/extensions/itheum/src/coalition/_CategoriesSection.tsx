import clsx from 'clsx'
import React, { useState } from 'react'
import { CoalitionInfo } from '../types'
import { Contracts } from '../contracts'
import { Button, Input, Theme } from '@peerme/web-ui'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'

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
      0n,
      [name],
      []
    )

  const handleRemove = (name: string) =>
    app.requestProposalAction(
      Contracts(app.config).RemoveCategory.Address,
      Contracts(app.config).RemoveCategory.Endpoint,
      0n,
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
        {props.info.categories.length > 0 ? (
          <ul>
            {props.info.categories.map((category) => (
              <li
                key={category}
                className={clsx(
                  'flex justify-between items-center gap-4 px-4 py-2 mb-2',
                  Theme.Background.Moderate,
                  Theme.BorderRadius.Subtle
                )}
              >
                <span className="text-gray-800 dark:text-gray-100">{category}</span>
                <button onClick={() => handleRemove(category)} className="text-red-500 dark:text-red-400">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories created yet.</p>
        )}
      </AppSection>
    </div>
  )
}
