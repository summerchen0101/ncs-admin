import PageHeader from './PageHeader'
import PageSearchBar from './PageSearchBar'
import TableData from './TableData'
import { useDataContext } from '@/context/DataContext'
import { Handicap } from '@/types/api/Handicap'
import React from 'react'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import ScorePopup from './ResultPopup'
import CreatePopup from './CreatePopup'

const PageEntry: React.FC = () => {
  const { list } = useDataContext<Handicap>()

  return (
    <Dashboard>
      <PageHeader />
      <PageSearchBar />
      <TableData list={list} />
      <Paginator mt="3" />
      <ScorePopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
