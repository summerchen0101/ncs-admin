import Breadcrumb from '@/components/MyBreadcrumb'
import menu from '@/lib/menu'
import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo } from 'react'

function PageHeader() {
  const router = useRouter()
  const id = router.query.id as string
  const pageInfo = useMemo(() => menu.member.pages.memberParams, [])

  return (
    <Stack direction={['row']} alignItems="center" mb="30px">
      <Breadcrumb
        category={menu.member.name}
        current={{
          ...pageInfo,
          path: pageInfo.path(+id),
        }}
      />
    </Stack>
  )
}

export default PageHeader
