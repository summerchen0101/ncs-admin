import { useGlobalContext } from '@/context/GlobalContext'
import { useLoaderProvider } from '@/context/LoaderProvider'
import errCodes from '@/lib/errCodes'
import Axios, { AxiosRequestConfig } from 'axios'
import { ResponseBase } from '../types'

const useRequest = () => {
  const { token } = useGlobalContext()
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const config: AxiosRequestConfig = {
    baseURL: process.env.apiBaseUrl,
    validateStatus: function (status) {
      loadingEnd()
      return status >= 200 && status < 300
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const AxiosInstance = Axios.create(config)
  AxiosInstance.interceptors.request.use((req) => {
    loadingStart()
    return req
  })

  AxiosInstance.interceptors.response.use((res) => {
    if (res.data.code) {
      throw new Error(errCodes[res.data.code] || `错误代码 ${res.data.code}`)
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
