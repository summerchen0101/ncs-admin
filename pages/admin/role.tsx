import AdminRolePageEntry from '@/components/AdminRole/AdminRolePageEntry'
import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import React from 'react'

function user() {
  return (
    <DataProvider>
      <PopupProvider>
        <AdminRolePageEntry />
      </PopupProvider>
    </DataProvider>
  )
}

export default user
