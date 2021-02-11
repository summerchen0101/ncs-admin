import PageHeader from '@/components/Menu/PageHeader'
import TableData from '@/components/Menu/TableData'
import { useDataContext } from '@/context/DataContext'
import { useSearchContext } from '@/context/SearchContext'
import { Menu, MenuListRequest } from '@/types/api/Menu'
import useMenuService from '@/utils/services/useMenuService'
import useOptionsService from '@/utils/services/useOptionsService'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Menu>()
  const { fetchList } = useMenuService()
  const { search, setSearch } = useSearchContext<MenuListRequest>()
  const { fetchPermissionOptions, fetchRoleOptions } = useOptionsService()

  useEffect(() => {
    fetchList(search)
  }, [search])

  useEffect(() => {
    Promise.all([fetchPermissionOptions(), fetchRoleOptions()])
  }, [])

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
