import PageHeader from '@/components/Marquee/PageHeader'
import PageSearchBar from '@/components/Marquee/PageSearchBar'
import TableData from '@/components/Marquee/TableData'
import { useDataContext } from '@/context/DataContext'
import { Marquee } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useMarqueeService()
  const { list } = useDataContext<Marquee>()

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
