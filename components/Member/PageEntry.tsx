import PageHeader from '@/components/Member/PageHeader'
import PageSearchBar from '@/components/Member/PageSearchBar'
import TableData from '@/components/Member/TableData'
import { useDataContext } from '@/context/DataContext'
import { Member } from '@/types/api/Member'
import React from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'
import PasswordPopup from './PasswordPopup'
import ViewPopup from './ViewPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Member>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <ViewPopup />
      <CreatePopup />
      <EditPopup />
      <PasswordPopup />
    </Dashboard>
  )
}

export default PageEntry
