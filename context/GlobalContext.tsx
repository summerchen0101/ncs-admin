import React, { createContext, useContext, useState } from 'react'

type ContextState = {
  menu: any[]
  setMenu: React.Dispatch<React.SetStateAction<any[]>>
}

const GlobalContext = createContext<ContextState>(null)

const GlobalProvider: React.FC = ({ children }) => {
  const [menu, setMenu] = useState([])
  return (
    <GlobalContext.Provider
      value={{
        menu,
        setMenu,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalProvider = () => useContext(GlobalContext)

export default GlobalProvider
