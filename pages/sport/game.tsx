import PageEntry from '@/components/SportGame/PageEntry'
import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import React from 'react'

function game() {
  return (
    <DataProvider>
      <PopupProvider>
        <PageEntry />
      </PopupProvider>
    </DataProvider>
  )
}

export default game
