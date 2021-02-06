import Breadcrumb from '@/components/MyBreadcrumb'
import { usePopupContext } from '@/context/PopupContext'
import menuInfo from '@/lib/menu'
import { Spacer, Stack } from '@chakra-ui/react'
import React from 'react'
import CreateButton from '../CreateButton'

function PageHeader() {
  const [, setFormVisible] = usePopupContext('createForm')
  return (
    <Stack direction={['row']} alignItems="center" mb="15px">
      <Breadcrumb
        category={menuInfo.sport.name}
        current={menuInfo.sport.pages.country}
      />
      <Spacer />
      <Stack direction="row">
        <CreateButton onClick={() => setFormVisible(true)} />
      </Stack>
    </Stack>
  )
}

export default PageHeader
