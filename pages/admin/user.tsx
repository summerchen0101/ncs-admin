import AdminUserPageEntry from '@/components/AdminUser/PageEntry'
import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import React from 'react'

function user() {
  return (
    <DataProvider>
      <PopupProvider>
        <AdminUserPageEntry />
      </PopupProvider>
    </DataProvider>
  )
}

export default user
