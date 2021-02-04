import React, { createContext, useContext, useState } from 'react'

type ContextState<T> = {
  search: T
  setSearch: React.Dispatch<React.SetStateAction<T>>
}

const SearchContext = createContext<ContextState<any>>(null)

const SearchProvider: React.FC = function <T>({ children }) {
  const [search, setSearch] = useState<T>(null)
  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = function <T>() {
  return useContext<ContextState<T>>(SearchContext)
}

export default SearchProvider
