import Logo from '@/components/Logo'
import MenuItem, { MenuItemProps } from '@/components/MenuItem'
import { Box, Drawer, DrawerContent } from '@chakra-ui/react'
import React from 'react'

type MenuDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const menu: MenuItemProps[] = [
  { name: '首頁', path: '/' },
  {
    name: '管理員管理',
    icon: 'HiOutlineUser',
    children: [
      { name: '管理員列表', path: '/admin/user' },
      { name: '角色管理', path: '/admin/role' },
    ],
  },
]

const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerContent maxW="240px">
        <Box w="100%" bg="teal.500" h="100vh" overflowY="auto">
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
