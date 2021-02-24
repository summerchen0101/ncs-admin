import PageHeader from '@/components/Handicap/PageHeader'
import PageSearchBar from '@/components/Handicap/PageSearchBar'
import TableData from '@/components/Handicap/TableData'
import { useDataContext } from '@/context/DataContext'
import { Handicap } from '@/types/api/Handicap'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Handicap>()
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
    </Dashboard>
  )
}

export default PageEntry
