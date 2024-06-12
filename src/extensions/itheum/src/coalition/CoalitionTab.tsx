import { CoalitionInfo } from '../types'
import { useScQuery } from '@peerme/core-ts'
import { toTypedCoalitionInfo } from '../helpers'
import React, { useState, useEffect } from 'react'
import { useApp } from '../../../../shared/hooks/useApp'
import { _CategoriesSection } from './_CategoriesSection'
import { _AggregatorSection } from './_AggregatorSection'
import { Contracts, getCoalitionContractAddress } from '../contracts'

export function CoalitionTab() {
  const app = useApp()
  const [info, setInfo] = useState<CoalitionInfo | null>(null)
  const infoQuery = useScQuery(app.config.walletConfig, Contracts(app.config).GetInfo)

  useEffect(() => {
    infoQuery
      .query([getCoalitionContractAddress(app.config.env)])
      .then((data) => setInfo(toTypedCoalitionInfo(data.firstValue?.valueOf())))
  }, [])

  return (
    <>
      {!!info && <_AggregatorSection info={info} className="mb-4" />}
      {!!info && <_CategoriesSection info={info} className="mb-4" />}
    </>
  )
}
