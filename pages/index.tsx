import React from 'react'
import Head from 'next/head'
import AirbnbExample from '@/components/AirbnbExample'
import Form from '@/components/Form'
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import MenuItem from '@/components/MenuItem'
import Logo from '@/components/Logo'

export default function Home() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  return (
    <Box d="flex" h="100vh">
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerContent maxW="240px">
          <Box w="100%" bg="teal.500" h="100vh" overflowY="auto">
            <Logo />
            {Array(5)
              .fill('')
              .map((_, i) => (
                <MenuItem key={i} />
              ))}
          </Box>
        </DrawerContent>
      </Drawer>

      <Box d="flex" flexDirection="column" w="100vw">
        <Box h="60px" boxShadow="md">
          Header
        </Box>
        <Box h="calc(100vh - 60px)" bg="gray.200">
          <Button onClick={onToggle}>選單開關</Button>
          <Box mb="8">123</Box>
        </Box>
      </Box>
    </Box>
  )
}
