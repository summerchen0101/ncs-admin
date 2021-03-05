import { useGlobalContext } from '@/context/GlobalContext'
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
  const { setUser } = useGlobalContext()
  const checkUserStatus = async () => {
    try {
      const res = await API.checkLogin()
      setUser(res.data.member)
      router.push('/home')
    } catch (err) {
      apiErrHandler(err)
    }
  }
  useEffect(() => {
    checkUserStatus()
  }, [])
  return <Center h="100vh" bg="gray.100"></Center>
}

export default IndexPage
