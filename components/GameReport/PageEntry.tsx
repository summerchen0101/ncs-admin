import PageHeader from '@/components/GameReport/PageHeader'
import PageSearchBar from '@/components/GameReport/PageSearchBar'
import TableData from '@/components/GameReport/TableData'
import { useDataContext } from '@/context/DataContext'
import { GameReport } from '@/types/api/GameReport'
import React from 'react'
import Dashboard from '../Dashboard'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<GameReport>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
    </Dashboard>
  )
}

export default PageEntry
