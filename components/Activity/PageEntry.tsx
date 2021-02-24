import PageHeader from '@/components/Activity/PageHeader'
import PageSearchBar from '@/components/Activity/PageSearchBar'
import TableData from '@/components/Activity/TableData'
import { useDataContext } from '@/context/DataContext'
import { Activity } from '@/types/api/Activity'
import React from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Activity>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
      <EditPopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
