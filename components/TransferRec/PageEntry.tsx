import PageHeader from '@/components/TransferRec/PageHeader'
import PageSearchBar from '@/components/TransferRec/PageSearchBar'
import TableData from '@/components/TransferRec/TableData'
import { useDataContext } from '@/context/DataContext'
import { TransferRec } from '@/types/api/TransferRec'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<TransferRec>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
    </Dashboard>
  )
}

export default PageEntry
