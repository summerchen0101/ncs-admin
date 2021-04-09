import Breadcrumb from '@/components/MyBreadcrumb'
import SearchButton from '@/components/SearchButton'
import { usePopupContext } from '@/context/PopupContext'
import menu from '@/lib/menu'
import { Spacer, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'

function PageHeader() {
  const [searchBarBisible, setSearchBarVisible] = usePopupContext('searchBar')
  return (
    <Stack direction={['row']} alignItems="center" mb="15px">
      <Breadcrumb
        category={menu.affiliate.name}
        current={menu.affiliate.pages.profit}
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
