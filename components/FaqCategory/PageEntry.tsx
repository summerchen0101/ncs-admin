import PageHeader from '@/components/FaqCategory/PageHeader'
import PageSearchBar from '@/components/FaqCategory/PageSearchBar'
import TableData from '@/components/FaqCategory/TableData'
import { useDataContext } from '@/context/DataContext'
import { FaqCategory } from '@/types/api/FaqCategory'
import useFaqCategoryService from '@/utils/services/useFaqCategoryService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useFaqCategoryService()
  const { list } = useDataContext<FaqCategory>()

  useEffect(() => {
    fetchList()
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
