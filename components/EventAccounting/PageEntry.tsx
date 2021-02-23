import { useDataContext } from '@/context/DataContext'
import { Marquee } from '@/types/api/Marquee'
import React from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'
import PageHeader from './PageHeader'
import PageSearchBar from './PageSearchBar'
import TableData from './TableData'
import ViewPopup from './ViewPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Marquee>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <ViewPopup />
    </Dashboard>
  )
}

export default PageEntry
