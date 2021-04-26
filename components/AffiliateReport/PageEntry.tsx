import PageHeader from './PageHeader'
import PageSearchBar from './PageSearchBar'
import TableData from './TableData'
import { useDataContext } from '@/context/DataContext'
import { MemberReport } from '@/types/api/MemberReport'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import EditPopup from './EditPopup'
import useOptionsService from '@/utils/services/useOptionsService'
import { ParsedUrlQuery } from 'querystring'

const PageEntry: React.FC<{ query: ParsedUrlQuery }> = ({ query }) => {
  const { list } = useDataContext<MemberReport>()
  const { fetchAffiliateLevelOptions } = useOptionsService()

  useEffect(() => {
    fetchAffiliateLevelOptions()
  }, [])

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar query={query} />
      <TableData list={list} />
      <Paginator mt="3" />
      <EditPopup />
    </Dashboard>
  )
}

export default PageEntry
