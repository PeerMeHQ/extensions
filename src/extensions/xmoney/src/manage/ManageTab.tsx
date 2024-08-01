import { Button } from '@peerme/web-ui'
import React, { SyntheticEvent } from 'react'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'
import { Contracts } from '../contracts'

export function ManageTab() {
  const app = useApp()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    app.requestProposalAction(
      Contracts(app.config).GuildDeploy.Address,
      Contracts(app.config).GuildDeploy.Endpoint,
      0n,
      [],
      []
    )
  }

  return (
    <AppSection title="Create Guild">
      <form onSubmit={handleSubmit}>
        <Button color="blue" className="block w-full" type="submit">
          TODO
        </Button>
      </form>
    </AppSection>
  )
}
