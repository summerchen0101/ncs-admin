import PageEntry from '@/components/AdminRole/PageEntry'
import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import React from 'react'

function marquee() {
  return (
    <DataProvider>
      <PopupProvider>
        <PageEntry />
      </PopupProvider>
    </DataProvider>
  )
}

export default marquee
