import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/dist/client/router'
import FormField from './FormField'
import useRequest from '@/utils/useRequest'
import { useGlobalProvider } from '@/context/GlobalContext'

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
  const API = useRequest()
  const { setToken } = useGlobalProvider()
  const onSubmit = handleSubmit(async (d) => {
    try {
      const res = await API.login({
        acc: d.acc,
        pass: d.pass,
      })
      setToken(res.data.token)
      await router.push('/')
      reset()
    } catch (err) {}
  })
  return (
    <Stack as="form" onSubmit={onSubmit} spacing="20px">
      <FormField label="管理帳號" code="acc" errors={errors}>
        <Input name="acc" ref={register({ required: true })} bgColor="white" />
      </FormField>
      <FormField label="密碼" code="pass" errors={errors}>
        <Input
          name="pass"
          type="password"
          ref={register({ required: true })}
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
