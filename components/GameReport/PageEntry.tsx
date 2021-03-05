import PageHeader from '@/components/GameReport/PageHeader'
import PageSearchBar from '@/components/GameReport/PageSearchBar'
import TableData from '@/components/GameReport/TableData'
import { useDataContext } from '@/context/DataContext'
import { GameReport } from '@/types/api/GameReport'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<GameReport>()

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
