import AdminUserForm from '@/components/AdminUser/AdminUserForm'
import AdminUserPageHeader from '@/components/AdminUser/AdminUserPageHeader'
import AdminUserSearchBar from '@/components/AdminUser/AdminUserSearchBar'
import AdminUserTable from '@/components/AdminUser/AdminUserTable'
import PageContainer from '@/components/PageContainer'
import { useDataContext } from '@/context/DataContext'
import { AdminUser } from '@/types/api/user'
import useAdminUserService from '@/utils/services/useAdminUserService'
import React, { useEffect } from 'react'

const AdminUserPageEntry: React.FC = () => {
  const { fetchUserList } = useAdminUserService()
  const { list } = useDataContext<AdminUser>()

  useEffect(() => {
    fetchUserList()
  }, [])

  return (
    <PageContainer>
      <AdminUserPageHeader />
      <AdminUserSearchBar />
      <AdminUserTable list={list} />
      <AdminUserForm />
    </PageContainer>
  )
}

export default AdminUserPageEntry
