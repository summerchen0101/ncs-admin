import PageHeader from '@/components/SportGame/PageHeader'
import PageSearchBar from '@/components/SportGame/PageSearchBar'
import TableData from '@/components/SportGame/TableData'
import { useDataContext } from '@/context/DataContext'
import { SportGame } from '@/types/api/SportGame'
import useSportGameService from '@/utils/services/useSportGameService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchCountryOptions, fetchSportOptions } = useOptionsService()
  const { list } = useDataContext<SportGame>()

  useEffect(() => {
    Promise.all([fetchCountryOptions(), fetchSportOptions()])
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
