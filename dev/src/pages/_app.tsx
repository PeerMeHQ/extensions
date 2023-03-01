import Head from 'next/head'
import '@/styles/globals.css'
import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
import { DevServerConfig } from '@/config'
import { ToastContainer } from '@peerme/web-ui'
import { DappProvider } from '@multiversx/sdk-dapp/wrappers/DappProvider'

const SignTransactionsModals = dynamic(
  async () => (await import('@multiversx/sdk-dapp/UI/SignTransactionsModals')).SignTransactionsModals,
  { ssr: false }
)

const TransactionsToastList = dynamic(
  async () => (await import('@multiversx/sdk-dapp/UI/TransactionsToastList')).TransactionsToastList,
  { ssr: false }
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PeerMe Extensions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <DappProvider
        environment={DevServerConfig.Network}
        customNetworkConfig={{
          name: 'customConfig',
          apiTimeout: 10_000,
          walletConnectV2ProjectId: DevServerConfig.WalletConnectProjectId,
        }}
      >
        <Component {...pageProps} />
        <SignTransactionsModals />
        <TransactionsToastList />
        <ToastContainer />
      </DappProvider>
    </>
  )
}
