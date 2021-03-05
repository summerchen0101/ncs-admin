import PageHeader from '@/components/Member/PageHeader'
import PageSearchBar from '@/components/Member/PageSearchBar'
import TableData from '@/components/Member/TableData'
import { useDataContext } from '@/context/DataContext'
import { Member } from '@/types/api/Member'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import BetSettingEditPopup from './BetSettingEditPopup'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'
import PasswordPopup from './PasswordPopup'
import TradePasswordPopup from './TradePasswordPopup'
import ViewPopup from './ViewPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Member>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
      <ViewPopup />
      <CreatePopup />
      <EditPopup />
      <PasswordPopup />
      <TradePasswordPopup />
      <BetSettingEditPopup />
    </Dashboard>
  )
}

export default PageEntry
