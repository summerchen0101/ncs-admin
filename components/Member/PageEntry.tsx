import PageHeader from '@/components/Member/PageHeader'
import PageSearchBar from '@/components/Member/PageSearchBar'
import TableData from '@/components/Member/TableData'
import { useDataContext } from '@/context/DataContext'
import { Member } from '@/types/api/Member'
import React from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Member>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <EditPopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
