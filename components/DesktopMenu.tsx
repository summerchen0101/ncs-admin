import menu from '@/lib/menu'
import { Box, BoxProps } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import Logo from './Logo'
import MenuItem from './MenuItem'

function DesktopMenu(props?: BoxProps) {
  const router = useRouter()
  return (
    <Box bg="gray.800" h="100vh" overflowY="auto" {...props} pb="100px">
      <Logo />
      {Object.entries(menu).map(([key, category], i) => {
        return (
          !category.menuHidden && (
            <MenuItem key={i} {...category} currentRoute={router.route} />
          )
        )
      })}
    </Box>
  )
}

export default DesktopMenu
