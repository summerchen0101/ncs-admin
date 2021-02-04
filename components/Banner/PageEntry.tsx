import PageHeader from '@/components/Banner/PageHeader'
import PageSearchBar from '@/components/Banner/PageSearchBar'
import TableData from '@/components/Banner/TableData'
import { useDataContext } from '@/context/DataContext'
import { Banner } from '@/types/api/Banner'
import React from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Banner>()

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
