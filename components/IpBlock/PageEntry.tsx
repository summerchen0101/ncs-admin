import PageHeader from '@/components/IpBlock/PageHeader'
import PageSearchBar from '@/components/IpBlock/PageSearchBar'
import TableData from '@/components/IpBlock/TableData'
import { useDataContext } from '@/context/DataContext'
import { IpBlock } from '@/types/api/IpBlock'
import React from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<IpBlock>()

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
