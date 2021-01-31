import useService from '@/utils/useService'
import { HStack, IconButton, Spacer } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineLogout, HiOutlineMenu } from 'react-icons/hi'

type HeaderProps = {
  onToggleMenu: () => void
}

const Header: React.FC<HeaderProps> = ({ onToggleMenu }) => {
  const { onLogout } = useService()
  return (
    <HStack h="60px" boxShadow="md" d="flex" alignItems="center" px="3">
      <IconButton
        aria-label="toggle menu"
        colorScheme="teal"
        size="sm"
        icon={<HiOutlineMenu size="18px" />}
        onClick={onToggleMenu}
      />
      <Spacer />
      <IconButton
        aria-label="logout"
        size="sm"
        icon={<HiOutlineLogout size="18px" />}
        onClick={onLogout}
      />
    </HStack>
  )
}

export default Header
