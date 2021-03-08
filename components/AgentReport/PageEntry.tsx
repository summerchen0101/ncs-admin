import { useDataContext } from '@/context/DataContext'
import { AgentReport } from '@/types/api/AgentReport'
import React from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import PageHeader from './PageHeader'
import PageSearchBar from './PageSearchBar'
import TableData from './TableData'

const PageEntry = function () {
  const { list } = useDataContext<AgentReport>()

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
