import { AdminUser } from '@/types/api/AdminRole'
import useStorage from '@/utils/useStorage'
import React, { createContext, useContext, useState } from 'react'

type ContextState<T, R> = {
  list: T[]
  setList: React.Dispatch<React.SetStateAction<T[]>>
  viewData: R
  setViewData: React.Dispatch<React.SetStateAction<R>>
  viewId: number
  setViewId: React.Dispatch<React.SetStateAction<number>>
}

const DataContext = createContext<ContextState<any, any>>(null)

const DataProvider: React.FC = function <T, R>({ children }) {
  const [list, setList] = useState<T[]>([])
  const [viewData, setViewData] = useState<R>(null)
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

export const useDataContext = function <T, R = T>() {
  return useContext<ContextState<T, R>>(DataContext)
}

export default DataProvider
