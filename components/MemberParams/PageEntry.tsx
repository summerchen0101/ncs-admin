import PageHeader from '@/components/MemberParams/PageHeader'
import React from 'react'
import Dashboard from '../Dashboard'
import ParamsForm from './ParamsForm'

const PageEntry: React.FC = () => {
  return (
    <Dashboard>
      <PageHeader />
      <ParamsForm />
    </Dashboard>
  )
}

export default PageEntry
