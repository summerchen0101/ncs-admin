import PageHeader from '@/components/AdminRole/PageHeader'
import TableData from '@/components/AdminRole/TableData'
import { useDataContext } from '@/context/DataContext'
import { AdminRole } from '@/types/api/AdminRole'
import useAdminRoleService from '@/utils/services/useAdminRoleService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useAdminRoleService()
  const { fetchPermissionOptions } = useOptionsService()
  const { list } = useDataContext<AdminRole>()

  useEffect(() => {
    fetchPermissionOptions()
    fetchList()
  }, [])

  return (
    <Dashboard>
      <PageHeader />
      <TableData list={list} />
      <EditPopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
