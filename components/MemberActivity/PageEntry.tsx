import PageHeader from './PageHeader'
import PageSearchBar from './PageSearchBar'
import TableData from './TableData'
import { useDataContext } from '@/context/DataContext'
import { MemberActivity } from '@/types/api/MemberActivity'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<MemberActivity>()

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
