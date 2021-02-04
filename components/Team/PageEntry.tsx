import PageHeader from '@/components/Team/PageHeader'
import TableData from '@/components/Team/TableData'
import { useDataContext } from '@/context/DataContext'
import { Team } from '@/types/api/Team'
import useOptionsService from '@/utils/services/useOptionsService'
import useTeamService from '@/utils/services/useTeamService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'
import PageSearchBar from './PageSearchBar'

const PageEntry: React.FC = () => {
  const { fetchGameOptions } = useOptionsService()
  const { list } = useDataContext<Team>()

  useEffect(() => {
    fetchGameOptions()
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
