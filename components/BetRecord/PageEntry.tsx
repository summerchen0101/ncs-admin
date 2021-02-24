import { useDataContext } from '@/context/DataContext'
import { BetRecord } from '@/types/api/BetRecord'
import React from 'react'
import Dashboard from '../Dashboard'
import PageHeader from './PageHeader'
import PageSearchBar from './PageSearchBar'
import TableData from './TableData'
import ViewPopup from './ViewPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<BetRecord>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <ViewPopup />
    </Dashboard>
  )
}

export default PageEntry
