import PageEntry from '@/components/MemberLog/PageEntry'
import DataProvider from '@/context/DataContext'
import PaginateProvider from '@/context/PaginateContext'
import PopupProvider from '@/context/PopupContext'
import SearchProvider from '@/context/SearchContext'
import React, { useEffect } from 'react'

function memberLog() {
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

export default memberLog
