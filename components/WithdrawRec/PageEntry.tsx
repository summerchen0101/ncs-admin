import PageHeader from '@/components/WithdrawRec/PageHeader'
import PageSearchBar from '@/components/WithdrawRec/PageSearchBar'
import TableData from '@/components/WithdrawRec/TableData'
import { useDataContext } from '@/context/DataContext'
import { WithdrawRec } from '@/types/api/WithdrawRec'
import React from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<WithdrawRec>()

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
