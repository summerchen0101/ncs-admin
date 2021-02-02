import useAuthService from '@/utils/services/useAuthService'
import { Button, Input, Stack } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import FormField from './FormField'

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
  const { onLogin } = useAuthService()
  const onSubmit = handleSubmit(onLogin)
  return (
    <Stack as="form" onSubmit={onSubmit} spacing="20px">
      <FormField label="管理帳號" code="acc" errors={errors}>
        <Input
          name="acc"
          ref={register({ required: '管理帳號必填' })}
          bgColor="white"
        />
      </FormField>
      <FormField label="密碼" code="pass" errors={errors}>
        <Input
          name="pass"
          type="password"
          ref={register({ required: '密碼必填' })}
          bgColor="white"
        />
      </FormField>
      <Button
        colorScheme="teal"
        isLoading={formState.isSubmitting}
        type="submit"
      >
        登 入
      </Button>
    </Stack>
  )
}

export default LoginForm
