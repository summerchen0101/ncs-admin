import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import GlobalProvider from '@/context/GlobalContext'
import DataProvider from '@/context/DataContext'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <ChakraProvider>
        <DataProvider>
          <Head>
            <title>{process.env.siteName}</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </DataProvider>
      </ChakraProvider>
    </GlobalProvider>
  )
}
export default MyApp
