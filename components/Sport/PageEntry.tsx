import PageHeader from '@/components/Sport/PageHeader'
import TableData from '@/components/Sport/TableData'
import { useDataContext } from '@/context/DataContext'
import { Sport } from '@/types/api/Sport'
import useSportService from '@/utils/services/useSportService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useSportService()
  const { list } = useDataContext<Sport>()

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <Dashboard>
      <PageHeader />
      {/* <PageSearchBar /> */}
      <TableData list={list} />
      <Paginator mt="3" />
      <EditPopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
