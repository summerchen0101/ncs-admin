import Breadcrumb from '@/components/MyBreadcrumb'
import SearchButton from '@/components/SearchButton'
import { Flex, Spacer } from '@chakra-ui/react'
import React from 'react'

function AdminUserPageHeader({ onToggle }: { onToggle: () => void }) {
  return (
    <Flex alignItems="center" mb="10px">
      <Breadcrumb
        category="管理員管理"
        current={{ name: '管理員列表', path: '/user' }}
      />
      <Spacer />
      <SearchButton onToggle={onToggle} />
    </Flex>
  )
}

export default AdminUserPageHeader
