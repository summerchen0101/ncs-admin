import menu from '@/lib/menu'
import { Box, BoxProps } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import Logo from './Logo'
import MenuItem from './MenuItem'

function DesktopMenu(props?: BoxProps) {
  const router = useRouter()
  return (
    <Box bg="blue.700" h="100vh" overflowY="auto" {...props} pb="40px">
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
