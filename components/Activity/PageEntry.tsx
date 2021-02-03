import PageHeader from '@/components/Activity/PageHeader'
import PageSearchBar from '@/components/Activity/PageSearchBar'
import TableData from '@/components/Activity/TableData'
import { useDataContext } from '@/context/DataContext'
import { Activity } from '@/types/api/Activity'
import useActivityService from '@/utils/services/useActivityService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useActivityService()
  const { list } = useDataContext<Activity>()

  useEffect(() => {
    fetchList()
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
