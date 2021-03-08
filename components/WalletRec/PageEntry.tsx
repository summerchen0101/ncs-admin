import PageHeader from '@/components/WalletRec/PageHeader'
import PageSearchBar from '@/components/WalletRec/PageSearchBar'
import TableData from '@/components/WalletRec/TableData'
import { useDataContext } from '@/context/DataContext'
import { WalletRec } from '@/types/api/WalletRec'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<WalletRec>()

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
