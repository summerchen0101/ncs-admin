import Breadcrumb from '@/components/MyBreadcrumb'
import SearchButton from '@/components/SearchButton'
import { usePopupProvider } from '@/context/PopupContext'
import { Flex, Spacer } from '@chakra-ui/react'
import React from 'react'

function AdminUserPageHeader() {
  const [_, setVisible] = usePopupProvider('searchBar')
  return (
    <Flex alignItems="center" mb="10px">
      <Breadcrumb
        category="管理員管理"
        current={{ name: '管理員列表', path: '/user' }}
      />
      <Spacer />
      <SearchButton onToggle={() => setVisible((v) => !v)} />
    </Flex>
  )
}

export default AdminUserPageHeader