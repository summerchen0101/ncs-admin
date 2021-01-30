import Form from '@/components/Form'
import LoginForm from '@/components/LoginForm'
import { Box, Container, Text } from '@chakra-ui/react'
import React from 'react'

const LoginPage = () => {
  return (
    <Container
      d="flex"
      justifyContent="center"
      alignItems="center"
      minW="100vw"
      minH="100vh"
      bgColor="gray.100"
    >
      <LoginForm />
    </Container>
  )
}

export default LoginPage
