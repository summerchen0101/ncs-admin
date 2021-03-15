import useAuthService from '@/utils/services/useAuthService'
import { Button, Input, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
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
      <FormField label="管理帐号" code="acc" errors={errors}>
        <Input
          name="acc"
          ref={register({ required: '管理帐号必填' })}
          bgColor="white"
          borderRadius="sm"
          placeholder="请输入管理帐号"
        />
      </FormField>
      <FormField label="密码" code="pass" errors={errors}>
        <Input
          name="pass"
          type="password"
          ref={register({ required: '密码必填' })}
          bgColor="white"
          borderRadius="sm"
          placeholder="请输入密码"
        />
      </FormField>
      <Button
        colorScheme="brand"
        isLoading={formState.isSubmitting}
        type="submit"
        borderRadius="sm"
      >
        登 入
      </Button>
    </Stack>
  )
}

export default LoginForm
