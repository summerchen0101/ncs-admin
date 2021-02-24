import PageHeader from '@/components/DefaultBet/PageHeader'
import PageSearchBar from '@/components/DefaultBet/PageSearchBar'
import TableData from '@/components/DefaultBet/TableData'
import { useDataContext } from '@/context/DataContext'
import { DefaultBet } from '@/types/api/DefaultBet'
import useDefaultBetService from '@/utils/services/useDefaultBetService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useDefaultBetService()
  const { fetchCountryOptions, fetchSportOptions } = useOptionsService()
  const { list } = useDataContext<DefaultBet>()

  useEffect(() => {
    Promise.all([fetchCountryOptions(), fetchSportOptions(), fetchList()])
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
