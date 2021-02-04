import menuInfo from '@/lib/menu'
import { Box, BoxProps } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import Logo from './Logo'
import MenuItem from './MenuItem'

function DesktopMenu(props?: BoxProps) {
  const router = useRouter()
  return (
    <Box
      bg="blue.700"
      h="100vh"
      overflowY="auto"
      transition="all 0.5s"
      {...props}
    >
      <Logo />
      {Object.entries(menuInfo).map(([key, category], i) => (
        <MenuItem key={i} {...category} currentRoute={router.route} />
      ))}
    </Box>
  )
}

export default DesktopMenu
