import Breadcrumb from '@/components/MyBreadcrumb'
import SearchButton from '@/components/SearchButton'
import { usePopupContext } from '@/context/PopupContext'
import { Flex, Spacer, Stack } from '@chakra-ui/react'
import React from 'react'
import CreateButton from '../CreateButton'

function PageHeader() {
  const [searchBarBisible, setSearchBarVisible] = usePopupContext('searchBar')
  return (
    <Stack direction={['row']} alignItems="center" mb="15px">
      <Breadcrumb
        category="活動管理"
        current={{ name: '活動審核', path: '/activity/review' }}
      />
      <Spacer />
      <Stack direction="row">
        <SearchButton
          onClick={() => setSearchBarVisible((v) => !v)}
          isOpen={searchBarBisible}
        />
      </Stack>
    </Stack>
  )
}

export default PageHeader
