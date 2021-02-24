import PageEntry from '@/components/Handicap/PageEntry'
import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import SearchProvider from '@/context/SearchContext'
import PaginateProvider from '@/context/PaginateContext'
import React from 'react'

function handicap() {
  return (
    <DataProvider>
      <PopupProvider>
        <SearchProvider>
          <PaginateProvider>
            <PageEntry />
          </PaginateProvider>
        </SearchProvider>
      </PopupProvider>
    </DataProvider>
  )
}

export default handicap
