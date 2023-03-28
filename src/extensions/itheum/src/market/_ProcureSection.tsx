import { OfferInfo } from '../types'
import { Input } from '@peerme/web-ui'
import { Contracts } from '../contracts'
import { _OfferDetails } from './_OfferDetails'
import React, { useEffect, useState } from 'react'
import { useApp } from '../../../../shared/hooks/useApp'
import { useDebounce, useScQuery } from '@peerme/core-ts'
import { AppSection } from '../../../../shared/ui/elements'
import { getOfferIdFromUrlOrNull, isValidItheumMarketplaceUrl, toTypedOfferInfo } from '../helpers'

type Props = {
  className?: string
}

export const _ProcureSection = (props: Props) => {
  const app = useApp()
  const [activeOffer, setActiveOffer] = useState<OfferInfo | null>(null)
  const [url, setUrl] = useState('')
  const debouncedUrl = useDebounce(url, 500)

  const viewOfferScQuery = useScQuery(app.config.walletConfig, Contracts(app.config).ViewOffer)

  useEffect(() => {
    if (!url) return
    const offerId = getOfferIdFromUrlOrNull(url)
    if (isValidItheumMarketplaceUrl(url) && offerId) {
      loadOffer(offerId)
    } else {
      setUrl('')
      app.showToast('Invalid Marketplace Url', 'error')
    }
  }, [debouncedUrl])

  const loadOffer = async (offerId: number) => {
    const offerBundle = await viewOfferScQuery.query([offerId])
    const offerValue = offerBundle.firstValue?.valueOf()
    if (!offerValue) {
      setUrl('')
      app.showToast('Offer not found', 'error')
      return
    }
    setActiveOffer(toTypedOfferInfo(offerValue))
  }

  const resetSection = () => {
    setActiveOffer(null)
    setUrl('')
  }

  return (
    <AppSection title="Procure" onCloseRequest={activeOffer ? resetSection : undefined} className={props.className}>
      {activeOffer ? (
        <_OfferDetails offer={activeOffer} />
      ) : (
        <Input placeholder="Paste a Marketplace Offer Url ..." value={url} onChange={(val) => setUrl(val)} />
      )}
    </AppSection>
  )
}
