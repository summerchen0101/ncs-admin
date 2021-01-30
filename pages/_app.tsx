import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
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
  )
}
export default MyApp
