import useStorage from '@/utils/useStorage'
import React, { createContext, useContext, useState } from 'react'

type ContextState = {
  menu: any[]
  setMenu: React.Dispatch<React.SetStateAction<any[]>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

const GlobalContext = createContext<ContextState>(null)

const GlobalProvider: React.FC = ({ children }) => {
  const [menu, setMenu] = useState([])
  const [token, setToken] = useStorage('token', '')
  return (
    <GlobalContext.Provider
      value={{
        menu,
        setMenu,
        token,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalProvider = () => useContext(GlobalContext)

export default GlobalProvider
