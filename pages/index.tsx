import Dashboard from '@/components/Dashboard'
import useAPI from '@/utils/useAPI'
import useErrorHandler from '@/utils/useErrorHandler'
import React, { useEffect } from 'react'

export default function Home() {
  const API = useAPI('auth')
  const { apiErrHandler } = useErrorHandler()
  const checkUserStatus = async () => {
    try {
      const res = await API.checkLogin()
      console.log(res)
    } catch (err) {
      apiErrHandler(err)
    }
  }
  useEffect(() => {
    checkUserStatus()
  }, [])
  return <Dashboard>首頁</Dashboard>
}
