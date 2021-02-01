import AdminUserForm from '@/components/user/AdminUserForm'
import AdminUserPageHeader from '@/components/user/AdminUserPageHeader'
import AdminUserSearchBar from '@/components/user/AdminUserSearchBar'
import AdminUserTable from '@/components/user/AdminUserTable'
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
