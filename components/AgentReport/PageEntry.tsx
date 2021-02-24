import PageHeader from './PageHeader'
import PageSearchBar from './PageSearchBar'
import TableData from './TableData'
import { useDataContext } from '@/context/DataContext'
import { AgentReport } from '@/types/api/AgentReport'
import React from 'react'
import Dashboard from '../Dashboard'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<AgentReport>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
    </Dashboard>
  )
}

export default PageEntry
