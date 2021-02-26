import {
  Box,
  Collapse,
  Icon,
  Text,
  TextProps,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo } from 'react'
import * as icons from 'react-icons/hi'

type ParamsPath = (parmas: any) => string

export type PageType = {
  name: string
  path?: string | ParamsPath
  menuHidden?: boolean
}
export interface MenuItemProps {
  name: string
  path?: string
  currentRoute?: string
  active?: boolean
  icon?: string
  pages?: Record<string, PageType>
}

const textStyles: TextProps = {
  fontWeight: '500',
  letterSpacing: '2px',
  color: 'gray.200',
  textShadow: '1px 0px rgba(0,0,0,0.2)',
}

const menuText = function (currentRoute: string, page: PageType) {
  return (
    <Box
      py="3"
      px="5"
      shadow="sm"
      cursor="pointer"
      bgColor={currentRoute.includes(page.path as string) && 'orange.600'}
    >
      <Text {...textStyles} ml="6">
        {page.name}
      </Text>
    </Box>
  )
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  path,
  currentRoute,
  active,
  icon,
  pages,
}) => {
  const { isOpen, onToggle, onOpen } = useDisclosure()
  const isCategoryActive = useMemo(() => {
    return (
      pages &&
      Object.values(pages).findIndex((t) =>
        currentRoute.includes(t.path as string),
      ) > -1
    )
  }, [currentRoute])
  const category = (
    <Text onClick={pages && onToggle} {...textStyles}>
      <Icon
        as={icons[icon] || icons.HiOutlineStar}
        verticalAlign="text-bottom"
        mr="2"
      />
      {name}
    </Text>
  )

  useEffect(() => {
    if (isCategoryActive) {
      onOpen()
    }
  }, [isCategoryActive])

  return (
    <Box w="100%" color="white">
      <Box
        w="100%"
        py="3"
        px="5"
        cursor="pointer"
        shadow="sm"
        // bgColor={isCategoryActive && 'gray.800'}
      >
        {!pages ? <Link href={path}>{category}</Link> : category}
      </Box>
      {pages && (
        <Collapse in={isOpen} animateOpacity>
          <Box bg="blue.900">
            {Object.entries(pages)
              .filter(([, item]) => !item.menuHidden)
              .map(([, item], i) => {
                if (item.path && typeof item.path === 'string') {
                  return (
                    <Link key={i} href={item.path}>
                      {menuText(currentRoute, item)}
                    </Link>
                  )
                }
                return menuText(currentRoute, item)
              })}
          </Box>
        </Collapse>
      )}
    </Box>
  )
}

export default MenuItem
