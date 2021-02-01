import DataProvider from '@/context/DataContext'
import PopupProvider from '@/context/PopupContext'
import useAuthService from '@/utils/services/useAuthService'
import React, { ReactNode, useEffect } from 'react'
import Dashboard from './Dashboard'

function PageContainer({ children }: { children: ReactNode }) {
  const { checkUserStatus } = useAuthService()
  useEffect(() => {
    checkUserStatus()
  }, [])
  return (
    <DataProvider>
      <PopupProvider>
        <Dashboard>{children}</Dashboard>
      </PopupProvider>
    </DataProvider>
  )
}

export default PageContainer
