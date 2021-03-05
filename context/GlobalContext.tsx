import { MemberBasic } from '@/types'
import useStorage from '@/utils/useStorage'
import React, { createContext, useContext, useState } from 'react'

type ContextState = {
  menu: any[]
  setMenu: React.Dispatch<React.SetStateAction<any[]>>
  user: MemberBasic
  setUser: React.Dispatch<React.SetStateAction<MemberBasic>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

const GlobalContext = createContext<ContextState>(null)

const GlobalProvider: React.FC = ({ children }) => {
  const [menu, setMenu] = useState([])
  const [user, setUser] = useStorage<MemberBasic>('user', null)
  const [token, setToken] = useStorage('token', '')
  return (
    <GlobalContext.Provider
      value={{
        menu,
        setMenu,
        token,
        setToken,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)

export default GlobalProvider
