import { Box, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Header from './Header'
import MenuDrawer from './MenuDrawer'

const Dashboard: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  return (
    <Box d="flex" h="100vh">
      <MenuDrawer isOpen={isOpen} onClose={onClose} />
      <Box d="flex" flexDirection="column" w="100vw">
        <Header onToggleMenu={onToggle} />
        <Box h="calc(100vh - 60px)" bg="gray.200" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
