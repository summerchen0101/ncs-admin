import { Box, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import DesktopMenu from './DesktopMenu'
import Header from './Header'

const Dashboard: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })
  // const { fetchMenuOptions } = useOptionsService()

  // useEffect(() => {
  //   fetchMenuOptions()
  // }, [])

  const menuW = '220px'
  const headerH = '60px'
  return (
    <Box
      d="flex"
      h="100vh"
      minW="100vw"
      ml={!isOpen && '-220px'}
      transition="all 0.2s ease-in-out"
    >
      <DesktopMenu minW={menuW} />
      <Box d="flex" flexDirection="column" pos="relative" minW="100vw">
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
        <Header
          onToggleMenu={onToggle}
          h={headerH}
          w={{ sm: '100vw', md: isOpen ? `calc(100vw - ${menuW})` : '100vw' }}
          transition="all 0.2s ease-in-out"
        />
        {/* content */}
        <Box
          h={`calc(100vh - ${headerH})`}
          w={{ sm: '100vw', md: isOpen ? `calc(100vw - ${menuW})` : '100vw' }}
          p="4"
          overflowY="auto"
          transition="all 0.2s ease-in-out"
          bg="gray.200"
          pb="100px"
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
