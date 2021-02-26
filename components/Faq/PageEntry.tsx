import PageHeader from '@/components/Faq/PageHeader'
import PageSearchBar from '@/components/Faq/PageSearchBar'
import TableData from '@/components/Faq/TableData'
import { useDataContext } from '@/context/DataContext'
import { Faq } from '@/types/api/Faq'
import useFaqService from '@/utils/services/useFaqService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchFaqCategoryOptions } = useOptionsService()
  const { list } = useDataContext<Faq>()

  useEffect(() => {
    fetchFaqCategoryOptions()
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
