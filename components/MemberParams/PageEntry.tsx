import PageHeader from '@/components/MemberParams/PageHeader'
import { useDataContext } from '@/context/DataContext'
import { Member } from '@/types/api/Member'
import React from 'react'
import Dashboard from '../Dashboard'

const PageEntry: React.FC = () => {
  return (
    <Dashboard>
      <PageHeader />
    </Dashboard>
  )
}

export default PageEntry
