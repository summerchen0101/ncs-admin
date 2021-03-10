import { useDataContext } from '@/context/DataContext'
import { AgentProfile, Member } from '@/types/api/Member'
import useMemberAPI from '@/utils/apis/useMemberAPI'
import useErrorHandler from '@/utils/useErrorHandler'
import { Accordion } from '@chakra-ui/accordion'
import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Dashboard from '../Dashboard'
import PageHeader from './PageHeader'
import PassPanel from './PassPanel'
import PromoPanel from './PromoPanel'

const PageEntry: React.FC = () => {
  const { apiErrHandler } = useErrorHandler()
  const { setViewData, viewData } = useDataContext<AgentProfile>()
  const API = useMemberAPI()

  const fetchProfile = async () => {
    try {
      const res = await API.profile()
      setViewData(res.data)
    } catch (err) {
      apiErrHandler(err)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])
  return (
    <Dashboard>
      <PageHeader />
      <Accordion
        defaultIndex={[0, 1]}
        allowMultiple
        maxW="900px"
        overflowX="auto"
      >
        <Stack spacing="20px" direction={['column', 'row']}>
          <PassPanel />
          <PromoPanel />
        </Stack>
      </Accordion>
    </Dashboard>
  )
}

export default PageEntry
