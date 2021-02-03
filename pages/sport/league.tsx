import PageEntry from '@/components/League/PageEntry'
import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import React from 'react'

function league() {
  return (
    <DataProvider>
      <PopupProvider>
        <PageEntry />
      </PopupProvider>
    </DataProvider>
  )
}

export default league
