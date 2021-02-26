import { BetSetting } from '@/types/api/Member'
import React, { createContext, useContext, useState } from 'react'

type ContextState<T> = {
  list: T[]
  setList: React.Dispatch<React.SetStateAction<T[]>>
  viewData: T
  setViewData: React.Dispatch<React.SetStateAction<T>>
  viewId: number
  setViewId: React.Dispatch<React.SetStateAction<number>>
  betSettings: BetSetting[]
  setBetSettings: React.Dispatch<React.SetStateAction<BetSetting[]>>
}

const DataContext = createContext<ContextState<any>>(null)

const DataProvider: React.FC = function <T>({ children }) {
  const [list, setList] = useState<T[]>([])
  const [viewData, setViewData] = useState<T>(null)
  const [viewId, setViewId] = useState<number>(null)
  const [betSettings, setBetSettings] = useState<BetSetting[]>()
  return (
    <DataContext.Provider
      value={{
        list,
        setList,
        viewData,
        setViewData,
        viewId,
        setViewId,
        betSettings,
        setBetSettings,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = function <T extends { id: number }>() {
  return useContext<ContextState<T>>(DataContext)
}

export default DataProvider
