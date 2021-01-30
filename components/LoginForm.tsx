import React from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Text,
  Icon,
} from '@chakra-ui/react'
import { HiOutlineCog } from 'react-icons/hi'

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
  const onSubmit = handleSubmit(async (d) => {
    try {
      await Promise.resolve()
      reset()
    } catch (err) {}
  })
  return (
    <Box
      w="sm"
      px={8}
      py={10}
      border="1px"
      borderRadius="lg"
      borderColor="gray.200"
      bgColor="white"
      boxShadow="md"
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
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.acc} mb={3}>
          <FormLabel htmlFor="acc" color="gray.600">
            管理帳號
          </FormLabel>
          <Input name="acc" ref={register({ required: true })} />
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
    </Box>
  )
}

export default LoginForm
