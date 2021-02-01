import AdminUserPageEntry from '@/components/user/AdminUserPageEntry'
import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import React from 'react'

const AdminUserPage: React.FC = () => {
  return (
    <DataProvider>
      <PopupProvider>
        <AdminUserPageEntry />
      </PopupProvider>
    </DataProvider>
  )
}

export default AdminUserPage
