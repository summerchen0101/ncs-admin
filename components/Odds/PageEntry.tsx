import PageHeader from '@/components/Odds/PageHeader'
import PageSearchBar from '@/components/Odds/PageSearchBar'
import TableData from '@/components/Odds/TableData'
import { useDataContext } from '@/context/DataContext'
import { useOptionsContext } from '@/context/OptionsContext'
import { Odds } from '@/types/api/Odds'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Odds>()
  const { fetchGameOptions } = useOptionsService()
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
