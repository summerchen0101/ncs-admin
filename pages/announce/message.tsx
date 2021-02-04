import PageEntry from '@/components/Message/PageEntry'
import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import SearchProvider from '@/context/SearchContext'
import React from 'react'

function news() {
  return (
    <DataProvider>
      <PopupProvider>
        <SearchProvider>
          <PageEntry />
        </SearchProvider>
      </PopupProvider>
    </DataProvider>
  )
}

export default news
