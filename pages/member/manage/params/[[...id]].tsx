import CreateEntry from '@/components/MemberParams/CreateEntry'
import EditEntry from '@/components/MemberParams/EditEntry'
import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import SearchProvider from '@/context/SearchContext'
import React from 'react'

function memberParams() {
  return (
    <DataProvider>
      <PopupProvider>
        <SearchProvider>
          <EditEntry />
        </SearchProvider>
      </PopupProvider>
    </DataProvider>
  )
}

export default memberParams
