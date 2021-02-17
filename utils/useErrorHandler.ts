import errCodes from '@/lib/errCodes'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import httpStatus from 'http-status'
import { useRouter } from 'next/dist/client/router'

function useErrorHandler() {
  const toast = useToast()
  const router = useRouter()

  const apiErrHandler = (error: AxiosError<any>) => {
    if (error.response) {
      // 錯誤來自回傳參數
      if (error.response.status === 401) {
        router.push('/login')
      }
      toast({ title: httpStatus[error.response.status], status: 'error' })
    } else if (error.request) {
      // 錯誤來自請求參數
      console.log(error.request)
    } else {
      // 錯誤來自其他因素
      toast({ title: error.message, status: 'error' })
    }
    // console.log(error.config)
  }
  return {
    apiErrHandler,
  }
}

export default useErrorHandler
