import { EsdtPool } from '../types'
import { Button } from '@peerme/web-ui'
import { Contracts } from '../contracts'
import React, { SyntheticEvent } from 'react'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'

type Props = {
  pool: EsdtPool
  className?: string
}

export function _Unstaker(props: Props) {
  const app = useApp()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    app.requestProposalAction(
      Contracts(app.config).UserUnstake.Address,
      Contracts(app.config).UserUnstake.Endpoint,
      0,
      [props.pool.pool_id],
      []
    )
  }

  return (
    <AppSection title="Stake now" className={props.className}>
      <form onSubmit={handleSubmit}>
        <p>Work in progress.</p>
        <Button color="blue" className="block w-full" submit>
          Add Stake Action to Proposal
        </Button>
      </form>
    </AppSection>
  )
}
