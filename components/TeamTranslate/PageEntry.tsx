import PageHeader from '@/components/TeamTranslate/PageHeader'
import PageSearchBar from '@/components/TeamTranslate/PageSearchBar'
import TableData from '@/components/TeamTranslate/TableData'
import { useDataContext } from '@/context/DataContext'
import { TeamTranslate } from '@/types/api/TeamTranslate'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<TeamTranslate>()
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
