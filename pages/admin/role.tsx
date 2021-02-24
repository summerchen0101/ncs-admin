import PageEntry from '@/components/AdminRole/PageEntry'
import DataProvider from '@/context/DataContext'
import PaginateProvider from '@/context/PaginateContext'
import PopupProvider from '@/context/PopupContext'
import SearchProvider from '@/context/SearchContext'
import React from 'react'

function user() {
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

export default user
