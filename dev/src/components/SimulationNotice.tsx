import { Alert } from '@peerme/web-ui'

type Props = {
  className?: string
}

export const SimulationNotice = (props: Props) => (
  <Alert type="warning" className={props.className}>
    Connect with your DeFi Extension to simulate DAO interactions & transactions with your wallet.
  </Alert>
)
