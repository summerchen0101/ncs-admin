import PageHeader from './PageHeader'
import PageSearchBar from './PageSearchBar'
import TableData from './TableData'
import { useDataContext } from '@/context/DataContext'
import { AffiliateProfit } from '@/types/api/AffiliateProfit'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import EditPopup from './EditPopup'
import useOptionsService from '@/utils/services/useOptionsService'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<AffiliateProfit>()
  const { fetchAffiliateLevelOptions } = useOptionsService()
  useEffect(() => {
    fetchAffiliateLevelOptions()
  }, [])

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
