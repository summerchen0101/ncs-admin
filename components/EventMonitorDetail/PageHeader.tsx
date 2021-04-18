import Breadcrumb from '@/components/MyBreadcrumb'
import SearchButton from '@/components/SearchButton'
import { usePopupContext } from '@/context/PopupContext'
import menu from '@/lib/menu'
import useStorage from '@/utils/useStorage'
import { Spacer, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import CreateButton from '../CreateButton'

function PageHeadeVisible
  const [searchBarBisible, setSearchBarVisible] = usePopupContext('searchBar')
  const [, setFormVisible] = usePopupContext('createForm')

  return (
    <Stack direction={['row']} alignItems="center" mb="15px">
      <Breadcrumb
        category={menu.event.name}
        current={menu.event.pages.monitor}
      />
      <Spacer />
      <Stack direction="row">
        <SearchButtonVisible
          onClick={() => setSearchBarVisible((v) => !v)}
          isOpen={searchBarBisible}
        />
        {/* <CreateButton onClick={() => setFormVisible(true)} /> */}
      </Stack>
    </Stack>
  )
}

export default PageHeader
