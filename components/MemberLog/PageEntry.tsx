import PageHeader from '@/components/MemberLog/PageHeader'
import PageSearchBar from '@/components/MemberLog/PageSearchBar'
import TableData from '@/components/MemberLog/TableData'
import { useDataContext } from '@/context/DataContext'
import { MemberLog } from '@/types/api/MemberLog'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<MemberLog>()

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
