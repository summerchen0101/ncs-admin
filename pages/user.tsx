import AdminUserForm from '@/components/AdminUser/AdminUserForm'
import AdminUserPageHeader from '@/components/AdminUser/AdminUserPageHeader'
import AdminUserSearchBar from '@/components/AdminUser/AdminUserSearchBar'
import AdminUserTable from '@/components/AdminUser/AdminUserTable'
import Dashboard from '@/components/Dashboard'
import { useDataContext } from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import { AdminUser } from '@/types/api/user'
import useAdminUserService from '@/utils/services/useAdminUserService'
import React, { useEffect } from 'react'

const UserPage: React.FC = () => {
  const { fetchUserList } = useAdminUserService()
  const { list } = useDataContext<AdminUser>()

  useEffect(() => {
    fetchUserList()
  }, [])

  return (
    <PopupProvider>
      <Dashboard>
        <AdminUserPageHeader />

        <AdminUserSearchBar />
        <AdminUserTable list={list} />
        <AdminUserForm />
      </Dashboard>
    </PopupProvider>
  )
}

export default UserPage
