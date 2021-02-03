import PageHeader from '@/components/ActivityReview/PageHeader'
import PageSearchBar from '@/components/ActivityReview/PageSearchBar'
import TableData from '@/components/ActivityReview/TableData'
import { useDataContext } from '@/context/DataContext'
import { ActivityReview } from '@/types/api/ActivityReview'
import useActivityReviewService from '@/utils/services/useActivityReviewService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useActivityReviewService()
  const { fetchPermissionOptions, fetchRoleOptions } = useOptionsService()
  const { list } = useDataContext<ActivityReview>()

  useEffect(() => {
    Promise.all([fetchRoleOptions(), fetchPermissionOptions(), fetchList()])
  }, [])

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <EditPopup />
    </Dashboard>
  )
}

export default PageEntry
