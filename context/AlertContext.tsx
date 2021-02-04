import { useDisclosure } from '@chakra-ui/react'
import React, { createContext, useContext } from 'react'

interface ContextProps {
  deleteAlert: ReturnType<typeof useDisclosure>
}

const AlertContext = createContext<ContextProps>(null)

const AlertProvider: React.FC = ({ children }) => {
  const initialState: ContextProps = {
    deleteAlert: useDisclosure(),
  }
  return (
    <AlertContext.Provider value={initialState}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertProvider

export const useAlertContext = (optionName: keyof ContextProps) => {
  const state = useContext(AlertContext)
  return state[optionName]
}
