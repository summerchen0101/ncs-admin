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
  onPageChanged: (current: number, size: number) => void
}

const PaginateContext = createContext<ContextState>(null)

const PaginateProvider: React.FC = function ({ children }) {
  const { setSearch } = useSearchContext()
  const [page, setPage] = useState(1)
  const [perpage, setPerpage] = useState(50)
  const [totalCount, setTotalCount] = useState(0)

  const onPageChanged = (current: number, size: number) => {
    if (size !== perpage) {
      setPage(1)
      setPerpage(size)
      setSearch((s) => ({ ...s, page: 1, perpage: size }))
      return
    }
    setPage(current)
    setSearch((s) => ({ ...s, page: current }))
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
      }}
    >
      {children}
    </PaginateContext.Provider>
  )
}

export const usePaginateContext = () => useContext(PaginateContext)

export default PaginateProvider
