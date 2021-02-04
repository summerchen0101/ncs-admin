import Breadcrumb from '@/components/MyBreadcrumb'
import SearchButton from '@/components/SearchButton'
import { usePopupContext } from '@/context/PopupContext'
import { Flex, Spacer, Stack } from '@chakra-ui/react'
import React from 'react'
import CreateButton from '../CreateButton'

function PageHeader() {
  const [searchBarBisible, setSearchBarVisible] = usePopupContext('searchBar')
  const [, setFormVisible] = usePopupContext('createForm')
  return (
    <Stack direction={['row']} alignItems="center" mb="15px">
      <Breadcrumb
        category="管理員管理"
        current={{ name: '管理員列表', path: '/admin/user' }}
      />
      <Spacer />
      <Stack direction="row">
        {/* <SearchButton
          onClick={() => setSearchBarVisible((v) => !v)}
          isOpen={searchBarBisible}
        /> */}
        <CreateButton onClick={() => setFormVisible(true)} />
      </Stack>
    </Stack>
  )
}

export default PageHeader
