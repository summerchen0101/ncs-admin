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
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const AxiosInstance = Axios.create(config)

  AxiosInstance.interceptors.response.use((res) => {
    if (res.data.code) {
      throw new Error(errCodes[res.data.code] || `錯誤代碼 ${res.data.code}`)
    }
    return res.data
  })

  const get = async function <T>(
    url: string,
    params = null,
  ): Promise<ResponseBase<T>> {
    loadingStart()
    const res = await AxiosInstance.get<any, ResponseBase<T>>(url, { params })
    loadingEnd()
    return res
  }
  const post = async function <T>(
    url: string,
    data = null,
  ): Promise<ResponseBase<T>> {
    loadingStart()
    const res = await AxiosInstance.post<any, ResponseBase<T>>(url, data)
    loadingEnd()
    return res
  }

  return {
    get,
    post,
    config,
  }
}

export default useRequest
