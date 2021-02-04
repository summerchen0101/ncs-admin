import PageHeader from '@/components/MemberTag/PageHeader'
import PageSearchBar from '@/components/MemberTag/PageSearchBar'
import TableData from '@/components/MemberTag/TableData'
import { useDataContext } from '@/context/DataContext'
import { MemberTag } from '@/types/api/MemberTag'
import React from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<MemberTag>()

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
