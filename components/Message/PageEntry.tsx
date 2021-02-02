import PageHeader from '@/components/Message/PageHeader'
import PageSearchBar from '@/components/Message/PageSearchBar'
import TableData from '@/components/Message/TableData'
import { useDataContext } from '@/context/DataContext'
import { Message } from '@/types/api/Message'
import useMessageService from '@/utils/services/useMessageService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import ViewPopup from './ViewPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useMessageService()
  const { fetchPermissionOptions, fetchRoleOptions } = useOptionsService()
  const { list } = useDataContext<Message>()

  useEffect(() => {
    Promise.all([fetchRoleOptions(), fetchPermissionOptions(), fetchList()])
  }, [])

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <ViewPopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
