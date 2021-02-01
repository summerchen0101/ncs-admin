import Breadcrumb from '@/components/MyBreadcrumb'
import SearchButton from '@/components/SearchButton'
import { usePopupContext } from '@/context/PopupContext'
import { Flex, Spacer } from '@chakra-ui/react'
import React from 'react'

function AdminRolePageHeader() {
  const [_, setVisible] = usePopupContext('searchBar')
  return (
    <Flex alignItems="center" mb="10px">
      <Breadcrumb
        category="管理員管理"
        current={{ name: '角色管理', path: '/admin/role' }}
      />
      <Spacer />
      <SearchButton onToggle={() => setVisible((v) => !v)} />
    </Flex>
  )
}

export default AdminRolePageHeader
