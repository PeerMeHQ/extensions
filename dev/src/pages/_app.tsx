import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from '@peerme/web-ui'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}
