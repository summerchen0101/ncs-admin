import PageHeader from '@/components/News/PageHeader'
import PageSearchBar from '@/components/News/PageSearchBar'
import TableData from '@/components/News/TableData'
import { useDataContext } from '@/context/DataContext'
import { News } from '@/types/api/News'
import React from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<News>()
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
