import PageHeader from '@/components/AdminUser/PageHeader'
import PageSearchBar from '@/components/AdminUser/PageSearchBar'
import TableData from '@/components/AdminUser/TableData'
import { useDataContext } from '@/context/DataContext'
import { AdminUser } from '@/types/api/AdminUser'
import useAdminUserService from '@/utils/services/useAdminUserService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchUserList } = useAdminUserService()
  const { fetchPermissionOptions, fetchRoleOptions } = useOptionsService()
  const { list } = useDataContext<AdminUser>()

  useEffect(() => {
    Promise.all([fetchRoleOptions(), fetchPermissionOptions(), fetchUserList()])
  }, [])

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <EditPopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
