import PageHeader from '@/components/LeagueTranslate/PageHeader'
import PageSearchBar from '@/components/LeagueTranslate/PageSearchBar'
import TableData from '@/components/LeagueTranslate/TableData'
import { useDataContext } from '@/context/DataContext'
import { LeagueTranslate } from '@/types/api/LeagueTranslate'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<LeagueTranslate>()
  const { fetchGameOptions } = useOptionsService()
  useEffect(() => {
    fetchGameOptions()
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
