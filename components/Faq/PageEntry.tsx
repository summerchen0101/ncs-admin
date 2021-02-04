import PageHeader from '@/components/Faq/PageHeader'
import PageSearchBar from '@/components/Faq/PageSearchBar'
import TableData from '@/components/Faq/TableData'
import { useDataContext } from '@/context/DataContext'
import { Faq } from '@/types/api/Faq'
import useFaqService from '@/utils/services/useFaqService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useFaqService()
  const { fetchFaqCategoryOptions } = useOptionsService()
  const { list } = useDataContext<Faq>()

  useEffect(() => {
    Promise.all([fetchFaqCategoryOptions(), fetchList()])
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
