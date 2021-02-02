import Logo from '@/components/Logo'
import MenuItem from '@/components/MenuItem'
import menu from '@/lib/menu'
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
        <Box w="100%" bg="blue.500" h="100vh" overflowY="auto">
          <Logo />
          {menu.map((m, i) => (
            <MenuItem key={i} {...m} />
          ))}
        </Box>
      </DrawerContent>
    </Drawer>
  )
}

export default MenuDrawer
