import PageHeader from '@/components/RealName/PageHeader'
import PageSearchBar from '@/components/RealName/PageSearchBar'
import TableData from '@/components/RealName/TableData'
import { useDataContext } from '@/context/DataContext'
import { RealName } from '@/types/api/RealName'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import ViewPopup from './ViewPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<RealName>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
      <ViewPopup />
    </Dashboard>
  )
}

export default PageEntry
