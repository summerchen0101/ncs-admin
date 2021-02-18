import PageEntry from '@/components/CountryBlock/PageEntry'
import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import SearchProvider from '@/context/SearchContext'
import React from 'react'

function gameReport() {
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

export default gameReport
