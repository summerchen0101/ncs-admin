import useAuthAPI from '@/utils/apis/useAuthAPI'
import useAuthService from '@/utils/services/useAuthService'
import useErrorHandler from '@/utils/useErrorHandler'
import { Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

const IndexPage = () => {
  const API = useAuthAPI()
  const router = useRouter()
  const { apiErrHandler } = useErrorHandler()
  const checkUserStatus = async () => {
    try {
      await API.checkLogin()
      router.push('/home')
    } catch (err) {
      apiErrHandler(err)
    }
  }
  useEffect(() => {
    checkUserStatus()
  }, [])
  return (
    <Center h="100vh" bg="gray.100">
      <Spinner size="xl" color="gray.400" thickness="4px" />
    </Center>
  )
}

export default IndexPage
