import React, { createContext, useContext, useState } from 'react'

type ContextState<T, M> = {
  list: T[]
  setList: React.Dispatch<React.SetStateAction<T[]>>
  viewData: T
  setViewData: React.Dispatch<React.SetStateAction<T>>
  viewId: number
  setViewId: React.Dispatch<React.SetStateAction<number>>
  search: M
  setSearch: React.Dispatch<React.SetStateAction<M>>
}

const DataContext = createContext<ContextState<any, any>>(null)

const DataProvider: React.FC = function <T, M>({ children }) {
  const [list, setList] = useState<T[]>([])
  const [viewData, setViewData] = useState<T>(null)
  const [viewId, setViewId] = useState<number>(null)
  const [search, setSearch] = useState<M>(null)
  return (
    <DataContext.Provider
      value={{
        list,
        setList,
        viewData,
        setViewData,
        viewId,
        setViewId,
        search,
        setSearch,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = function <T, M = {}>() {
  return useContext<ContextState<T, M>>(DataContext)
}

export default DataProvider
