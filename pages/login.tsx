import LoginForm from '@/components/LoginForm'
import { Box, Flex, Text } from '@chakra-ui/react'
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
          <Text
            fontWeight={500}
            letterSpacing="5px"
            fontSize="1.5em"
            color="gray.300"
            textAlign="center"
          >
            体育反波胆控制台
          </Text>
        </Box>
        <LoginForm />
      </Box>
    </Flex>
  )
}

export default LoginPage
