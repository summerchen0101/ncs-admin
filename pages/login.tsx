import LoginForm from '@/components/LoginForm'
import { Box, Center, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const LoginPage = () => {
  return (
    <Flex
      justifyContent="center"
      h="100vh"
      alignItems="center"
      bgColor="gray.700"
    >
      <Box
        w={['full', 'sm']}
        px="8"
        pt="40px"
        pb={['80px', '50px']}
        borderRadius={['0', 'md']}
        bgColor="gray.900"
        shadow={{ md: 'md' }}
        mt={['-150px', 0]}
      >
        <Box mb="30px">
          <Center>
            <Image src="/logo.png" h="50px" />
          </Center>
        </Box>
        <LoginForm />
      </Box>
    </Flex>
  )
}

export default LoginPage
