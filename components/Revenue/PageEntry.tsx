import PageHeader from './PageHeader'
import PageSearchBar from './PageSearchBar'
import TableData from './TableData'
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
