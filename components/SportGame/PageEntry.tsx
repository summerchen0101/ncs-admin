import PageHeader from '@/components/SportGame/PageHeader'
import PageSearchBar from '@/components/SportGame/PageSearchBar'
import TableData from '@/components/SportGame/TableData'
import { useDataContext } from '@/context/DataContext'
import { SportGame } from '@/types/api/SportGame'
import useSportGameService from '@/utils/services/useSportGameService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useSportGameService()
  const { fetchCountryOptions, fetchSportOptions } = useOptionsService()
  const { list } = useDataContext<SportGame>()

  useEffect(() => {
    Promise.all([fetchCountryOptions(), fetchSportOptions(), fetchList()])
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
