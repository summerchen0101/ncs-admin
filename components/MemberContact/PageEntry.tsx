import PageHeader from '@/components/MemberContact/PageHeader'
import PageSearchBar from '@/components/MemberContact/PageSearchBar'
import TableData from '@/components/MemberContact/TableData'
import { useDataContext } from '@/context/DataContext'
import { MemberContact } from '@/types/api/MemberContact'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import ViewPopup from './ViewPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<MemberContact>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
      <ViewPopup />
    </Dashboard>
  )
}

export default PageEntry
