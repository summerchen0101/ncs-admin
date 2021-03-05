import PageHeader from '@/components/MemberShadow/PageHeader'
import PageSearchBar from '@/components/MemberShadow/PageSearchBar'
import TableData from '@/components/MemberShadow/TableData'
import { useDataContext } from '@/context/DataContext'
import { MemberShadow } from '@/types/api/MemberShadow'
import useSubAccService from '@/utils/services/useMemberShadowService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'
import PasswordPopup from './PasswordPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<MemberShadow>()
  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
      <EditPopup />
      <CreatePopup />
      <PasswordPopup />
    </Dashboard>
  )
}

export default PageEntry
