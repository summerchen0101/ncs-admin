import Logo from '@/components/Logo'
import MenuItem from '@/components/MenuItem'
import menu from '@/lib/menu'
import menuInfo from '@/lib/menu'
import { Box, Drawer, DrawerContent } from '@chakra-ui/react'
import React from 'react'

type MenuDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerContent maxW="240px">
        <Box w="100%" bg="blue.800" h="100vh" overflowY="auto">
          <Logo />
          {Object.entries(menuInfo).map(([key, value], i) => (
            <MenuItem key={i} {...value} />
          ))}
        </Box>
      </DrawerContent>
    </Drawer>
  )
}

export default MenuDrawer
