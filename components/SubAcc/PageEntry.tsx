import PageHeader from '@/components/SubAcc/PageHeader'
import PageSearchBar from '@/components/SubAcc/PageSearchBar'
import TableData from '@/components/SubAcc/TableData'
import { useDataContext } from '@/context/DataContext'
import { SubAcc } from '@/types/api/SubAcc'
import useSubAccService from '@/utils/services/useSubAccService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'
import PasswordPopup from './PasswordPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useSubAccService()
  const { fetchPermissionOptions, fetchRoleOptions } = useOptionsService()
  const { list } = useDataContext<SubAcc>()

  useEffect(() => {
    Promise.all([fetchRoleOptions(), fetchPermissionOptions(), fetchList()])
  }, [])

  return (
    <Dashboard>
      <PageHeader />
      {/* <PageSearchBar /> */}
      <TableData list={list} />
      <Paginator mt="3" />
      <EditPopup />
      <CreatePopup />
      <PasswordPopup />
    </Dashboard>
  )
}

export default PageEntry
