import AdminUserPageHeader from '@/components/AdminUser/AdminUserPageHeader'
import AdminUserSearchBar from '@/components/AdminUser/AdminUserSearchBar'
import AdminUserTable from '@/components/AdminUser/AdminUserTable'
import Dashboard from '@/components/Dashboard'
import Breadcrumb from '@/components/MyBreadcrumb'
import SearchButton from '@/components/SearchButton'
import { useDataContext } from '@/context/DataContext'
import { AdminUser } from '@/types/api/user'
import useAdminUserService from '@/utils/services/useAdminUserService'
import { Flex, Spacer, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'

const UserPage: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })
  const { fetchUserList } = useAdminUserService()
  const { list } = useDataContext<AdminUser>()

  useEffect(() => {
    fetchUserList()
  }, [])

  return (
    <Dashboard>
      <AdminUserPageHeader onToggle={onToggle} />

      <AdminUserSearchBar isOpen={isOpen} />
      <AdminUserTable list={list} />
    </Dashboard>
  )
}

export default UserPage
