import PageHeader from './PageHeader'
import PageSearchBar from './PageSearchBar'
import TableData from './TableData'
import { useDataContext } from '@/context/DataContext'
import { CashflowMerchant } from '@/types/api/CashflowMerchant'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'
import useOptionsService from '@/utils/services/useOptionsService'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<CashflowMerchant>()

  const { fetchCashflowGroups, fetchThirdPartyOptions } = useOptionsService()

  useEffect(() => {
    Promise.all([fetchCashflowGroups(), fetchThirdPartyOptions()])
  }, [])

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
