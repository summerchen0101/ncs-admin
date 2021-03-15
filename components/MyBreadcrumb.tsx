import React, { useEffect } from 'react'
import {
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { MenuPage } from './MenuItem'

type MyBreadcrumbProps = {
  category: string
  current: MenuPage
}

const MyBreadcrumb: React.FC<MyBreadcrumbProps & BreadcrumbProps> = ({
  category,
  current,
  ...rest
}) => {
  return (
    <Breadcrumb
      spacing="4px"
      separator={<ChevronRightIcon color="gray.500" />}
      {...rest}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/" as={Link}>
          首页
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>{category}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href={current.path} as={Link}>
          {current.name}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default MyBreadcrumb
