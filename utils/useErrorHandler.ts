import errCodes from '@/lib/errCodes'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import httpStatus from 'http-status'
import { useRouter } from 'next/dist/client/router'

function useErrorHandler() {
  const toast = useToast()
  const router = useRouter()

  const errCodeHandler = (code: number) => {
    if (!code) return
    throw new Error(errCodes[code] || '操作錯誤')
  }
  const apiErrHandler = (error: AxiosError<any>) => {
    // console.log(error)
    if (error.response) {
      if (error.response.status === 401) {
        router.push('/login')
      }
      toast({ title: httpStatus[error.response.status], status: 'error' })
      console.log(error.response.data)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
      toast({ title: error.message, status: 'error' })
    }
    // console.log(error.config)
  }
  return {
    apiErrHandler,
    errCodeHandler,
  }

  // const router = useRouter()
  // const toast = useToast()
  // let errorMsg = ''
  // if (res.data.code) {
  //   errorMsg = errCodes[res.data.code]
  // } else if (res.status === 401) {
  //   router.push('/login')
  //   errorMsg = httpStatus[401]
  // } else if (res.status === 500) {
  //   errorMsg = '系統錯誤'
  // } else if (res.data.error) {
  //   errorMsg = '操作錯誤'
  // }
  // if (errorMsg) {
  //   toast({
  //     title: errorMsg,
  //   })
  //   throw new Error(errorMsg)
  // }
}

export default useErrorHandler
