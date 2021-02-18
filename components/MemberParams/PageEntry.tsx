import PageHeader from '@/components/MemberParams/PageHeader'
import React from 'react'
import Dashboard from '../Dashboard'
import FormData from './FormData'

const PageEntry: React.FC = () => {
  return (
    <Dashboard>
      <PageHeader />
      <FormData />
    </Dashboard>
  )
}

export default PageEntry
