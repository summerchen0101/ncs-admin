import { Box, IconButton } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineMenu } from 'react-icons/hi'

type HeaderProps = {
  onToggleMenu: () => void
}

const Header: React.FC<HeaderProps> = ({ onToggleMenu }) => {
  return (
    <Box h="60px" boxShadow="md" d="flex" alignItems="center" px="3">
      <IconButton
        aria-label="toggle menu"
        colorScheme="teal"
        icon={<HiOutlineMenu size="30px" />}
        onClick={onToggleMenu}
      />
    </Box>
  )
}

export default Header
