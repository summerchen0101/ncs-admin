import PageHeader from '@/components/FaqCategory/PageHeader'
import PageSearchBar from '@/components/FaqCategory/PageSearchBar'
import TableData from '@/components/FaqCategory/TableData'
import { useDataContext } from '@/context/DataContext'
import menu from '@/lib/menu'
import { FaqCategory } from '@/types/api/FaqCategory'
import useFaqCategoryService from '@/utils/services/useFaqCategoryService'
import { Button } from '@chakra-ui/button'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import { HiOutlineReply } from 'react-icons/hi'
import Dashboard from '../Dashboard'
import Paginator from '../Paginator'
import CreatePopup from './CreatePopup'
import EditPopup from './EditPopup'

const PageEntry: React.FC = () => {
  const { fetchList } = useFaqCategoryService()
  const { list } = useDataContext<FaqCategory>()
  const router = useRouter()
  useEffect(() => {
    fetchList()
  }, [])

  return (
    <Dashboard>
      <PageHeader />
      {/* <PageSearchBar /> */}
      {/* <Button
        onClick={() => router.push(menu.website.pages.faq.path)}
        borderRadius="0"
        colorScheme="brand"
        bgColor="gray.600"
        size="sm"
        leftIcon={<HiOutlineReply />}
        mb="10px"
      >
        問題列表
      </Button> */}
      <TableData list={list} />
      <Paginator mt="3" />
      <EditPopup />
      <CreatePopup />
    </Dashboard>
  )
}

export default PageEntry
