import menu from '@/lib/menu'
import { Center } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Fade } from '@chakra-ui/transition'
import { useRouter } from 'next/dist/client/router'
import React, { createContext, useContext, useState } from 'react'

type ContextState = {
  isLoading: boolean
  loadingStart: () => void
  loadingEnd: () => void
}

const LoaderContext = createContext<ContextState>(null)

const LoaderProvider: React.FC = ({ children }) => {
  const [isLoading, setLoading] = useState(false)
  const loadingStart = () => setLoading(true)
  const loadingEnd = () => setLoading(false)
  const router = useRouter()
  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        loadingStart,
        loadingEnd,
      }}
    >
      {children}
      <Fade
        in={isLoading && router.pathname !== '/event/monitor/details'}
        unmountOnExit
      >
        <Center p="40px" h="full" w="full" pos="fixed" top="0" zIndex="99999">
          <Spinner size="xl" color="gray.400" thickness="4px" />
        </Center>
      </Fade>
    </LoaderContext.Provider>
  )
}

export const useLoaderProvider = () => useContext(LoaderContext)

export default LoaderProvider
