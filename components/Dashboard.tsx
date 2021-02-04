import { Box, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import DesktopMenu from './DesktopMenu'
import Header from './Header'
import MenuDrawer from './MenuDrawer'

const Dashboard: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()

  const menuW = '220px'
  const headerH = '60px'
  return (
    <Box
      d="flex"
      h="100vh"
      w="100vw"
      ml={!isOpen && '-220px'}
      transition="all 0.2s ease-in-out"
    >
      {/* <MenuDrawer isOpen={isOpen} onClose={onClose} /> */}
      <DesktopMenu minW={menuW} />
      <Box d="flex" flexDirection="column" w="100vw" pos="relative">
        <Box
          visibility={[isOpen ? 'visible' : 'hidden', 'hidden']}
          onClick={onClose}
          w="100vw"
          h="100vh"
          pos="absolute"
          zIndex="9"
          top="0"
          right="0"
          transition="all 0.1s ease-in-out"
        />
        <Header onToggleMenu={onToggle} h={headerH} />
        <Box
          h={`calc(100vh - ${headerH})`}
          w="100vw"
          bg="gray.200"
          p="4"
          overflowY="auto"
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
