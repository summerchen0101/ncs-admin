import LoginForm from '@/components/LoginForm'
import { Box, Container, Text } from '@chakra-ui/react'
import React from 'react'

const LoginPage = () => {
  return (
    <Container
      d="flex"
      justifyContent="center"
      alignItems={{ md: 'center' }}
      minW="100vw"
      minH="100vh"
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
    </Container>
  )
}

export default LoginPage
