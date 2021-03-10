import { useGlobalContext } from '@/context/GlobalContext'
import { LoginRequest } from '@/types/api/Auth'
import useAuthAPI from '@/utils/apis/useAuthAPI'
import useAuthService from '@/utils/services/useAuthService'
import useErrorHandler from '@/utils/useErrorHandler'
import {
  Button,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormField from './FormField'

interface FormProps {
  acc: string
  pass: string
  code: string
}

const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    errors,
    register,
    formState,
    reset,
  } = useForm<FormProps>()
  const { apiErrHandler } = useErrorHandler()
  const [captchaToken, setCaptchaToken] = useState('')
  const { setToken, setUser } = useGlobalContext()
  const [captchImg, setCaptchaImg] = useState('')
  const router = useRouter()
  const { onLogin } = useAuthService()
  const API = useAuthAPI()

  const fetchCaptcha = async () => {
    try {
      const res = await API.captcha()
      setCaptchaImg(res.data.img)
      setCaptchaToken(res.data.token)
    } catch (err) {}
  }

  const onSubmit = handleSubmit(async (d) => {
    await onLogin({
      acc: d.acc,
      pass: d.pass,
      code: d.code,
      token: captchaToken,
    })
  })

  useEffect(() => {
    fetchCaptcha()
  }, [])
  return (
    <Stack as="form" onSubmit={onSubmit} spacing="20px">
      <FormField label="管理帳號" code="acc" errors={errors}>
        <Input
          name="acc"
          ref={register({ required: '管理帳號必填' })}
          bgColor="white"
          borderRadius="sm"
          placeholder="請輸入管理帳號"
        />
      </FormField>
      <FormField label="密碼" code="pass" errors={errors}>
        <Input
          name="pass"
          type="password"
          ref={register({ required: '密碼必填' })}
          bgColor="white"
          borderRadius="sm"
          placeholder="請輸入密碼"
        />
      </FormField>
      <FormField label="驗證碼" code="code" errors={errors}>
        <InputGroup>
          <Input
            name="code"
            ref={register({ required: '驗證碼必填' })}
            bgColor="white"
            borderRadius="sm"
          />
          <InputRightAddon p="0" onClick={fetchCaptcha} borderRadius="sm">
            <Image src={captchImg} h="full" />
          </InputRightAddon>
        </InputGroup>
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
