import PageHeader from '@/components/LeagueGroup/PageHeader'
import PageSearchBar from '@/components/LeagueGroup/PageSearchBar'
import TableData from '@/components/LeagueGroup/TableData'
import { useDataContext } from '@/context/DataContext'
import { LeagueGroup } from '@/types/api/LeagueGroup'
import useLeagueGroupService from '@/utils/services/useLeagueGroupService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useLeagueGroupService()
  const { fetchGameOptions } = useOptionsService()
  const { list } = useDataContext<LeagueGroup>()

  useEffect(() => {
    Promise.all([fetchGameOptions(), fetchList()])
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
