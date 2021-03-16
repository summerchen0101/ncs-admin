import AlertProvider from '@/context/AlertContext'
import GlobalProvider from '@/context/GlobalContext'
import OptionsProvider from '@/context/OptionsContext'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Head from 'next/head'
import React, { useEffect } from 'react'
import AntDesignProvider from '@/utils/AntDesignProvider'
import 'antd/dist/antd.css'
import '@/styles/globals.scss'
import LoaderProvider from '@/context/LoaderProvider'
import theme from '@/lib/theme'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <AntDesignProvider>
        <ChakraProvider theme={theme}>
          <LoaderProvider>
            <AlertProvider>
              <OptionsProvider>
                <Head>
                  <title>{process.env.siteName}</title>
                  <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                  />
                  <link
                    rel="shortcut icon"
                    type="image/x-icon"
                    href="/favicon.ico"
                  />
                </Head>
                <Component {...pageProps} />
              </OptionsProvider>
            </AlertProvider>
          </LoaderProvider>
        </ChakraProvider>
      </AntDesignProvider>
    </GlobalProvider>
  )
}
export default MyApp
