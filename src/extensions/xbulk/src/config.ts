import { Network } from '../../../shared/types'

export const XBulkConfig = {
  ContractAddress: (network: Network) => {
    if (network === 'devnet') return 'erd1qqqqqqqqqqqqqpgq7qdqsuq4a4pga2hxa5h0gvluf7hlc6hndn3q32jth5'
    if (network === 'testnet') return 'erd1qqqqqqqqqqqqqpgq5j3wahajwehwja70v39074zzzjsq89lkdn3qp3j2f9'
    return 'erd1qqqqqqqqqqqqqpgqwcv369k9x49ve3qlu0h5qe949w7m6gcxh42scqtdpf'
  },

  Endpoints: {
    BulkSend: 'bulksend',
    BulkSendSameAmount: 'bulksendSameAmount',
  },
}
