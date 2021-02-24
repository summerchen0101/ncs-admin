import PageHeader from '@/components/Merchant/PageHeader'
import TableData from '@/components/Merchant/TableData'
import { useDataContext } from '@/context/DataContext'
import { useSearchContext } from '@/context/SearchContext'
import { Merchant } from '@/types/api/Merchant'
import useMerchantService from '@/utils/services/useMerchantService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Merchant>()
  const { setSearch, search } = useSearchContext()
  const { fetchList } = useMerchantService()
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <Dashboard>
      <PageHeader />
      <TableData list={list} />
      <Paginator mt="3" />
      <EditPopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
