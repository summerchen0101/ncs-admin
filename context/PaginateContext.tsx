import React, { createContext, useContext, useState } from 'react'
import { useDataContext } from './DataContext'
import { useSearchContext } from './SearchContext'

type ContextState = {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  perpage: number
  setPerpage: React.Dispatch<React.SetStateAction<number>>
  totalCount: number
  setTotalCount: React.Dispatch<React.SetStateAction<number>>
  onPageChanged: (current: number) => void
  onPerpageChanged: (current: number, size: number) => void
}

const PaginateContext = createContext<ContextState>(null)

const PaginateProvider: React.FC = function ({ children }) {
  const { setSearch } = useSearchContext()
  const [page, setPage] = useState(1)
  const [perpage, setPerpage] = useState(50)
  const [totalCount, setTotalCount] = useState(0)

  const onPageChanged = (current: number) => {
    setPage(current)
    setSearch((s) => ({ ...s, page: current }))
  }
  const onPerpageChanged = (current: number, size: number) => {
    setPerpage(size)
    setSearch((s) => ({ ...s, perpage: size }))
  }

  return (
    <PaginateContext.Provider
      value={{
        page,
        setPage,
        perpage,
        setPerpage,
        totalCount,
        setTotalCount,
        onPageChanged,
        onPerpageChanged,
      }}
    >
      {children}
    </PaginateContext.Provider>
  )
}

export const usePaginateContext = () => useContext(PaginateContext)

export default PaginateProvider
