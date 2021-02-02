import PageHeader from '@/components/News/PageHeader'
import PageSearchBar from '@/components/News/PageSearchBar'
import TableData from '@/components/News/TableData'
import { useDataContext } from '@/context/DataContext'
import { News } from '@/types/api/News'
import useNewsService from '@/utils/services/useNewsService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'
import PasswordPopup from './PasswordPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useNewsService()
  const { fetchPermissionOptions, fetchRoleOptions } = useOptionsService()
  const { list } = useDataContext<News>()

  useEffect(() => {
    Promise.all([fetchRoleOptions(), fetchPermissionOptions(), fetchList()])
  }, [])

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <EditPopup />
      <CreatePopup />
      <PasswordPopup />
    </Dashboard>
  )
}

export default PageEntry
