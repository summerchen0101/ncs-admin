import PageHeader from '@/components/Member/PageHeader'
import PageSearchBar from '@/components/Member/PageSearchBar'
import TableData from '@/components/Member/TableData'
import { useDataContext } from '@/context/DataContext'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useMemberService()
  const { list } = useDataContext<Member>()

  useEffect(() => {
    fetchList()
  }, [])

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
