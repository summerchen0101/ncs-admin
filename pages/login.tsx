import LoginForm from '@/components/LoginForm'
import { Box, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const LoginPage = () => {
  return (
    <Flex
      justifyContent="center"
      h="100vh"
      alignItems={{ md: 'center' }}
      bgColor={{ md: 'gray.100' }}
    >
      <Box
        w="sm"
        px="8"
        py="10"
        borderRadius="lg"
        bgColor={{ md: 'white' }}
        boxShadow={{ md: 'md' }}
        mt={[10, 0]}
      >
        <Box mb={5}>
          <Text
            fontWeight={500}
            letterSpacing="5px"
            fontSize="1.5em"
            color="teal.500"
            textAlign="center"
          >
            體育反波膽控制台
          </Text>
        </Box>
        <LoginForm />
      </Box>
    </Flex>
  )
}

export default LoginPage
