import PageEntry from '@/components/EventMonitor/PageEntry'
import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import SearchProvider from '@/context/SearchContext'
import React from 'react'

function monitor() {
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

export default monitor
