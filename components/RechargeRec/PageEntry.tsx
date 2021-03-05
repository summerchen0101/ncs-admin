import PageHeader from '@/components/RechargeRec/PageHeader'
import PageSearchBar from '@/components/RechargeRec/PageSearchBar'
import TableData from '@/components/RechargeRec/TableData'
import { useDataContext } from '@/context/DataContext'
import { RechargeRec } from '@/types/api/RechargeRec'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<RechargeRec>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
