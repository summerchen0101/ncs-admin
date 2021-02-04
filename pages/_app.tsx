import AlertProvider from '@/context/AlertContext'
import GlobalProvider from '@/context/GlobalContext'
import OptionsProvider from '@/context/OptionsContext'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import AntDesignProvider from '@/utils/AntDesignProvider'
import 'antd/dist/antd.css'
import '@/styles/globals.css'

const theme = extendTheme({
  colors: {
    brand: {
      500: '#1890ff',
    },
  },
  components: {
    Input: {
      baseStyle: {
        bgColor: 'gray.100',
      },
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <AntDesignProvider>
        <ChakraProvider theme={theme}>
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
      </AntDesignProvider>
    </GlobalProvider>
  )
}
export default MyApp
