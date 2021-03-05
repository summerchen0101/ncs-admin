import PageHeader from '@/components/Message/PageHeader'
import PageSearchBar from '@/components/Message/PageSearchBar'
import TableData from '@/components/Message/TableData'
import { useDataContext } from '@/context/DataContext'
import { Message } from '@/types/api/Message'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import ViewPopup from './ViewPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Message>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
      <ViewPopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
