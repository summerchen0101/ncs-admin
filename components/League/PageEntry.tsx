import PageHeader from '@/components/League/PageHeader'
import TableData from '@/components/League/TableData'
import { useDataContext } from '@/context/DataContext'
import { League } from '@/types/api/League'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'
import PageSearchBar from './PageSearchBar'

const PageEntry: React.FC = () => {
  const { fetchGameOptions } = useOptionsService()
  const { list } = useDataContext<League>()

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
