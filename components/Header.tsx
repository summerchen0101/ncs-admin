import { useGlobalContext } from '@/context/GlobalContext'
import useService from '@/utils/services/useAuthService'
import { HStack, Icon, Text, Spacer } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineLogout, HiOutlineMenu } from 'react-icons/hi'

type HeaderProps = {
  onToggleMenu: () => void
}

const Header: React.FC<HeaderProps> = ({ onToggleMenu }) => {
  const { onLogout } = useService()
  const { user } = useGlobalContext()
  return (
    <HStack h="60px" boxShadow="md" d="flex" alignItems="center" px="3">
      <Icon
        as={HiOutlineMenu}
        fontSize="23px"
        onClick={onToggleMenu}
        cursor="pointer"
      />
      <Spacer />
      <Text>{user?.acc}</Text>
      <Icon
        as={HiOutlineLogout}
        fontSize="23px"
        onClick={onLogout}
        cursor="pointer"
        transform="scaleX(-1)"
      />
    </HStack>
  )
}

export default Header
