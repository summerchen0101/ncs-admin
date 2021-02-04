import PageHeader from '@/components/CountryBlock/PageHeader'
import TableData from '@/components/CountryBlock/TableData'
import { useDataContext } from '@/context/DataContext'
import { useSearchContext } from '@/context/SearchContext'
import { CountryBlock, CountryBlockListRequest } from '@/types/api/CountryBlock'
import useCountryBlockService from '@/utils/services/useCountryBlockService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<CountryBlock>()
  const { fetchList } = useCountryBlockService()
  const { search } = useSearchContext<CountryBlockListRequest>()
  useEffect(() => {
    fetchList()
  }, [search])
  return (
    <Dashboard>
      <PageHeader />
      <TableData list={list} />
      <EditPopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
