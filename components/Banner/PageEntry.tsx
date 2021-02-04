import PageHeader from '@/components/Banner/PageHeader'
import PageSearchBar from '@/components/Banner/PageSearchBar'
import TableData from '@/components/Banner/TableData'
import { useDataContext } from '@/context/DataContext'
import { Banner } from '@/types/api/Banner'
import useBannerService from '@/utils/services/useBannerService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useBannerService()
  const { list } = useDataContext<Banner>()

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
