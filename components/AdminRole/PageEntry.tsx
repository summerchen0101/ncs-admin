import PageHeader from '@/components/AdminRole/PageHeader'
import TableData from '@/components/AdminRole/TableData'
import { useDataContext } from '@/context/DataContext'
import { AdminRole } from '@/types/api/AdminRole'
import useAdminRoleService from '@/utils/services/useAdminRoleService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchUserList } = useAdminRoleService()
  const { list } = useDataContext<AdminRole>()

  useEffect(() => {
    fetchUserList()
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
