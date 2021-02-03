import PageHeader from '@/components/Country/PageHeader'
import PageSearchBar from '@/components/Country/PageSearchBar'
import TableData from '@/components/Country/TableData'
import { useDataContext } from '@/context/DataContext'
import { Country } from '@/types/api/Country'
import useCountryService from '@/utils/services/useCountryService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useCountryService()
  const { fetchPermissionOptions, fetchRoleOptions } = useOptionsService()
  const { list } = useDataContext<Country>()

  useEffect(() => {
    Promise.all([fetchRoleOptions(), fetchPermissionOptions(), fetchList()])
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
