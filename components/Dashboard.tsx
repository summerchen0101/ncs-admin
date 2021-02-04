import { Box, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import DesktopMenu from './DesktopMenu'
import Header from './Header'
import MenuDrawer from './MenuDrawer'

const Dashboard: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

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
      <Box d="flex" flexDirection="column" pos="relative" w="100vw">
        {/* backdrop */}
        <Box
          visibility={[isOpen ? 'visible' : 'hidden', 'hidden']}
          onClick={onClose}
          w="100%"
          h="100vh"
          pos="absolute"
          zIndex="9"
          top="0"
          right="0"
          transition="all 0.1s ease-in-out"
        />
        {/* header */}
        <Header onToggleMenu={onToggle} h={headerH} />
        {/* content */}
        <Box
          h={`calc(100vh - ${headerH})`}
          w={{ sm: '100vw', md: isOpen ? `calc(100vw - ${menuW})` : '100vw' }}
          bg="gray.200"
          p="4"
          overflowY="auto"
          transition="all 0.2s ease-in-out"
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
