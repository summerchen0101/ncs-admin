import AdminUserForm from '@/components/AdminUser/AdminUserForm'
import AdminUserPageHeader from '@/components/AdminUser/AdminUserPageHeader'
import AdminUserSearchBar from '@/components/AdminUser/AdminUserSearchBar'
import AdminUserTable from '@/components/AdminUser/AdminUserTable'
import { useDataContext } from '@/context/DataContext'
import { AdminUser } from '@/types/api/AdminUser'
import useAdminUserService from '@/utils/services/useAdminUserService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'

const AdminUserPageEntry: React.FC = () => {
  const { fetchUserList } = useAdminUserService()
  const { list } = useDataContext<AdminUser>()

  useEffect(() => {
    fetchUserList()
  }, [])

  return (
    <Dashboard>
      <AdminUserPageHeader />
      <AdminUserSearchBar />
      <AdminUserTable list={list} />
      <AdminUserForm />
    </Dashboard>
  )
}

export default AdminUserPageEntry
