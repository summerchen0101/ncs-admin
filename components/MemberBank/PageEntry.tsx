import PageHeader from '@/components/MemberBank/PageHeader'
import PageSearchBar from '@/components/MemberBank/PageSearchBar'
import TableData from '@/components/MemberBank/TableData'
import { useDataContext } from '@/context/DataContext'
import { MemberBank } from '@/types/api/MemberBank'
import React from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<MemberBank>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
      <EditPopup />
    </Dashboard>
  )
}

export default PageEntry
