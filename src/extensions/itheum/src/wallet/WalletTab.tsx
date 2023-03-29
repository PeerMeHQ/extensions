import { fetchDataNftsOfAccount } from '../api'
import React, { useEffect, useState } from 'react'
import { _DataNftPreview } from './_DataNftPreview'
import { useApp } from '../../../../shared/hooks/useApp'
import { AppSection } from '../../../../shared/ui/elements'
import { DataNftMetadata, MarketRequirements } from '../types'

type Props = {
  marketRequirements: MarketRequirements
}

export const WalletTab = (props: Props) => {
  const app = useApp()
  const [nfts, setNfts] = useState<DataNftMetadata[]>([])

  useEffect(() => {
    fetchDataNftsOfAccount(app).then((nfts) => setNfts(nfts))
  }, [])

  return (
    <AppSection title="Wallet">
      {nfts.length > 0 ? (
        <ul className="flex flex-wrap gap-4">
          {nfts.map((nft) => (
            <li key={nft.id}>
              <_DataNftPreview nft={nft} marketRequirements={props.marketRequirements} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          {app.config.entity.name} does not own any DataNFTs.
        </p>
      )}
    </AppSection>
  )
}
