import PageHeader from '@/components/PageContent/PageHeader'
import PageSearchBar from '@/components/PageContent/PageSearchBar'
import TableData from '@/components/PageContent/TableData'
import { useDataContext } from '@/context/DataContext'
import { PageContent } from '@/types/api/PageContent'
import usePageContentService from '@/utils/services/usePageContentService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = usePageContentService()
  const { list } = useDataContext<PageContent>()

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
