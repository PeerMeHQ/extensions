import { OfferInfo } from '../types'
import React, { useState } from 'react'
import { _OffersSection } from './_OffersSection'
import { _ProcureSection } from './_ProcureSection'

export function MarketTab() {
  const [procurable, setProcurable] = useState<OfferInfo | null>(null)

  return (
    <>
      <_ProcureSection procurable={procurable} className="mb-4" />
      <_OffersSection onProcureRequest={(val) => setProcurable(val)} />
    </>
  )
}
