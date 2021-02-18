import Breadcrumb from '@/components/MyBreadcrumb'
import { usePopupContext } from '@/context/PopupContext'
import menu from '@/lib/menu'
import { Spacer, Stack } from '@chakra-ui/react'
import React from 'react'
import CreateButton from '../CreateButton'

function PageHeader() {
  const [, setFormVisible] = usePopupContext('createForm')
  return (
    <Stack direction={['row']} alignItems="center" mb="30px">
      <Breadcrumb
        category={menu.member.name}
        current={menu.member.pages.memberParams}
      />
    </Stack>
  )
}

export default PageHeader
