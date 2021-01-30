import React from 'react'
import {
  Text,
  Breadcrumb as CBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Link from 'next/link'

type BreadcrumbProps = {
  category: string
  current: { name: string; path: string }
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ category, current }) => {
  return (
    <CBreadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
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
    </CBreadcrumb>
  )
}

export default Breadcrumb
