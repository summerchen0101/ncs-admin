import AdminRoleForm from '@/components/AdminRole/AdminRoleForm'
import AdminRolePageHeader from '@/components/AdminRole/AdminRolePageHeader'
import AdminRoleSearchBar from '@/components/AdminRole/AdminRoleSearchBar'
import AdminRoleTable from '@/components/AdminRole/AdminRoleTable'
import { useDataContext } from '@/context/DataContext'
import { AdminRole } from '@/types/api/AdminRole'
import useAdminRoleService from '@/utils/services/useAdminRoleService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'

const AdminRolePageEntry: React.FC = () => {
  const { fetchUserList } = useAdminRoleService()
  const { list } = useDataContext<AdminRole>()

  useEffect(() => {
    fetchUserList()
  }, [])

  return (
    <Dashboard>
      <AdminRolePageHeader />
      <AdminRoleSearchBar />
      <AdminRoleTable list={list} />
      <AdminRoleForm />
    </Dashboard>
  )
}

export default AdminRolePageEntry
