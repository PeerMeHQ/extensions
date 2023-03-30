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
  procurable?: OfferInfo | null
  className?: string
}

export const _ProcureSection = (props: Props) => {
  const app = useApp()
  const [activeOffer, setActiveOffer] = useState<OfferInfo | null>(props.procurable || null)
  const [url, setUrl] = useState('')
  const debouncedUrl = useDebounce(url, 500)

  const viewOfferScQuery = useScQuery(app.config.walletConfig, Contracts(app.config).ViewOffer)

  useEffect(() => {
    if (!props.procurable) return
    setActiveOffer(props.procurable)
  }, [props.procurable])

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
    <AppSection
      title="Procure an Offer"
      onCloseRequest={activeOffer ? resetSection : undefined}
      className={props.className}
    >
      {activeOffer ? (
        <_OfferDetails offer={activeOffer} />
      ) : (
        <>
          <Input
            placeholder="https://itheum.com/dataNfts/marketplace/DATANFTFT2-71ac28-ae/offer-50"
            value={url}
            onChange={(val) => setUrl(val)}
          />
          <small className="block mt-2 pl-2 text-base text-gray-700 dark:text-gray-300">
            Paste a link to an offer to view details.
          </small>
        </>
      )}
    </AppSection>
  )
}
