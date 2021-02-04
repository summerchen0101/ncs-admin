import React, { createContext, useContext, useState } from 'react'

type ContextState<T> = {
  list: T[]
  setList: React.Dispatch<React.SetStateAction<T[]>>
  viewData: T
  setViewData: React.Dispatch<React.SetStateAction<T>>
  viewId: number
  setViewId: React.Dispatch<React.SetStateAction<number>>
}

const DataContext = createContext<ContextState<any>>(null)

const DataProvider: React.FC = function <T>({ children }) {
  const [list, setList] = useState<T[]>([])
  const [viewData, setViewData] = useState<T>(null)
  const [viewId, setViewId] = useState<number>(null)
  return (
    <DataContext.Provider
      value={{
        list,
        setList,
        viewData,
        setViewData,
        viewId,
        setViewId,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = function <T>() {
  return useContext<ContextState<T>>(DataContext)
}

export default DataProvider
