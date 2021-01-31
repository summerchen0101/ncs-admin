import { useGlobalProvider } from '@/context/GlobalContext'
import errCodes from '@/lib/errCodes'
import Axios, { AxiosRequestConfig } from 'axios'
import { ResponseBase } from '../lib/types'

const useRequest = () => {
  const { token } = useGlobalProvider()
  const config: AxiosRequestConfig = {
    withCredentials: true,
    baseURL: process.env.apiBaseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const AxiosInstance = Axios.create(config)

  AxiosInstance.interceptors.response.use((res) => {
    if (res.data.code) {
      throw new Error(errCodes[res.data.code] || '操作錯誤')
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

  return {
    get,
    post,
    config,
  }
}

export default useRequest
