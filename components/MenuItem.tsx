import {
  Box,
  BoxProps,
  Collapse,
  Icon,
  Text,
  TextProps,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo } from 'react'
import * as icons from 'react-icons/hi'

export type MenuPage = {
  name: string
  path?: string
  menuHidden?: boolean
  icon?: string
}
export interface MenuCategory {
  name: string
  path?: string
  currentRoute?: string
  active?: boolean
  icon?: string
  pages?: Record<string, MenuPage>
  menuHidden?: boolean
}

const textStyles: TextProps = {
  fontWeight: '500',
  letterSpacing: '2px',
  color: 'gray.200',
  // textShadow: '1px 0px rgba(0,0,0,0.2)',
}

const menuText = function (currentRoute: string, page: MenuPage) {
  return (
    <Box
      py="3"
      px="5"
      shadow="sm"
      cursor="pointer"
      bgColor={currentRoute === page.path && 'brand.500'}
    >
      <Text {...textStyles} ml="6">
        {page.name}
      </Text>
    </Box>
  )
}

const MenuItem: React.FC<MenuCategory & BoxProps> = ({
  name,
  path,
  currentRoute,
  active,
  icon,
  pages,
  ...props
}) => {
  const { isOpen, onToggle, onOpen } = useDisclosure()
  const isCategoryActive = useMemo(() => {
    return (
      pages &&
      Object.values(pages).findIndex((t) => t.path === currentRoute) > -1
    )
  }, [currentRoute])
  const category = (
    <Text onClick={pages && onToggle} {...textStyles}>
      <Icon
        as={icons[icon] || icons.HiOutlineStar}
        mr="2"
        fontSize="20px"
        verticalAlign="bottom"
        color="brown.300"
      />
      <Text as="span" verticalAlign="middle">
        {name}
      </Text>
    </Text>
  )

  useEffect(() => {
    if (isCategoryActive) {
      onOpen()
    }
  }, [isCategoryActive])

  return (
    <Box w="100%" color="white" {...props}>
      <Box
        w="100%"
        py="3"
        px="5"
        cursor="pointer"
        borderBottom="1px solid #3b3b3b"
        bgColor={isCategoryActive ? '#111' : 'gray.800'}
      >
        {!pages ? <Link href={path}>{category}</Link> : category}
      </Box>
      {pages && (
        <Collapse in={isOpen} animateOpacity>
          <Box bg="gray.700">
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
