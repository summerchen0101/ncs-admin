import PageEntry from '@/components/BetSearch/PageEntry'
import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import SearchProvider from '@/context/SearchContext'
import React from 'react'

function marquee() {
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

export default marquee
