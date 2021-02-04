import PageHeader from '@/components/Handicap/PageHeader'
import PageSearchBar from '@/components/Handicap/PageSearchBar'
import TableData from '@/components/Handicap/TableData'
import { useDataContext } from '@/context/DataContext'
import { Handicap } from '@/types/api/Handicap'
import React from 'react'
import Dashboard from '../Dashboard'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Handicap>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
    </Dashboard>
  )
}

export default PageEntry
