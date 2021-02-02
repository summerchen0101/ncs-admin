import AlertProvider from '@/context/AlertContext'
import GlobalProvider from '@/context/GlobalContext'
import OptionsProvider from '@/context/OptionsContext'
import 'antd/dist/antd.css'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <ChakraProvider>
        <AlertProvider>
          <OptionsProvider>
            <Head>
              <title>{process.env.siteName}</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
            </Head>
            <Component {...pageProps} />
          </OptionsProvider>
        </AlertProvider>
      </ChakraProvider>
    </GlobalProvider>
  )
}
export default MyApp
