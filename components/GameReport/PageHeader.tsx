import Breadcrumb from '@/components/MyBreadcrumb'
import menu from '@/lib/menu'
import { Stack } from '@chakra-ui/react'
import React from 'react'

function PageHeader() {
  return (
    <Stack direction={['row']} alignItems="center" mb="15px">
      <Breadcrumb
        category={menu.report.name}
        current={menu.report.pages.game}
      />
    </Stack>
  )
}

export default PageHeader
