import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import GlobalProvider from '@/context/GlobalContext'
import DataProvider from '@/context/DataContext'
import '@/styles/globals.css'
import OptionsProvider from '@/context/OptionsContext'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <OptionsProvider>
        <ChakraProvider>
          <Head>
            <title>{process.env.siteName}</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </ChakraProvider>
      </OptionsProvider>
    </GlobalProvider>
  )
}
export default MyApp
