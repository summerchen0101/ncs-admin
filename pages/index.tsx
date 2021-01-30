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
          <Box w="100%" bg="gray.200" p="5" h="100vh">
            <Logo />
            {Array(5)
              .fill('')
              .map((_, i) => (
                <MenuItem key={i} />
              ))}
          </Box>
        </DrawerContent>
      </Drawer>

      <Box p={[5, 10]}>
        <Button onClick={onToggle}>選單開關</Button>
        <Box mb="8">
          <Form />
        </Box>
      </Box>
    </Box>
  )
}
