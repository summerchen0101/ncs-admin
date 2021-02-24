import PageHeader from '@/components/Marquee/PageHeader'
import PageSearchBar from '@/components/Marquee/PageSearchBar'
import TableData from '@/components/Marquee/TableData'
import { useDataContext } from '@/context/DataContext'
import { Marquee } from '@/types/api/Marquee'
import React from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Marquee>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
      <EditPopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
