import Axios, { AxiosRequestConfig } from 'axios'
import httpStatus from 'http-status'
import { useRouter } from 'next/dist/client/router'
import { useGlobalProvider } from '@/context/GlobalContext'
import errCodes from '../lib/errCodes'
import { ResponseBase } from '../lib/types'
import { useToast } from '@chakra-ui/react'
import { LoginRequest, LoginResponse } from '@/types/api/login'

const useRequest = () => {
  const router = useRouter()
  const { token } = useGlobalProvider()
  const toast = useToast()
  const config: AxiosRequestConfig = {
    withCredentials: true,
    baseURL: process.env.apiBaseUrl,
    validateStatus: (status) => {
      return true
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const AxiosInstance = Axios.create(config)
  AxiosInstance.interceptors.response.use((res) => {
    let errorMsg = ''
    if (res.data.code) {
      errorMsg = errCodes[res.data.code]
    } else if (res.status === 401) {
      router.push('/login')
      errorMsg = httpStatus[401]
    } else if (res.status === 500) {
      errorMsg = '系統錯誤'
    } else if (res.data.error) {
      errorMsg = '操作錯誤'
    }
    if (errorMsg) {
      toast({
        title: errorMsg,
      })
      throw new Error(errorMsg)
    }
    return res.data
  })
  const get = function <T>(
    url: string,
    params = null,
  ): Promise<ResponseBase<T>> {
    return AxiosInstance.get(url, { params })
  }
  const post = async function <T>(
    url: string,
    data = null,
  ): Promise<ResponseBase<T>> {
    return AxiosInstance.post(url, data)
  }

  const login = (req: LoginRequest) => post<LoginResponse>('login', req)
  const logout = () => get<null>('logout')

  return {
    login,
    logout,
  }
}

export default useRequest
