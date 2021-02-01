import React from 'react'
import {
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Link from 'next/link'

type MyBreadcrumbProps = {
  category: string
  current: { name: string; path: string }
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
          首頁
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
