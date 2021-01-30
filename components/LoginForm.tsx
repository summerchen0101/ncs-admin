import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/dist/client/router'

interface FormProps {
  acc: string
  pass: string
}

const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    errors,
    register,
    formState,
    reset,
  } = useForm<FormProps>()
  const router = useRouter()
  const onSubmit = handleSubmit(async (d) => {
    try {
      await Promise.resolve()
      await router.push('/')
      reset()
    } catch (err) {}
  })
  return (
    <form onSubmit={onSubmit}>
      <FormControl isInvalid={!!errors.acc} mb={3}>
        <FormLabel htmlFor="acc" color="gray.600">
          管理帳號
        </FormLabel>
        <Input name="acc" ref={register({ required: true })} bgColor="white" />
        <FormErrorMessage>{errors.acc?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.pass} mb={3}>
        <FormLabel htmlFor="pass" color="gray.600">
          密碼
        </FormLabel>
        <Input
          name="pass"
          type="password"
          ref={register({ required: true })}
          bgColor="white"
        />
        <FormErrorMessage>{errors.pass?.message}</FormErrorMessage>
      </FormControl>
      <Box mt={6}>
        <Button
          colorScheme="teal"
          w="100%"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          登 入
        </Button>
      </Box>
    </form>
  )
}

export default LoginForm
