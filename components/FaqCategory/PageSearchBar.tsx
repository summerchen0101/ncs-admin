import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import pages from '@/lib/pages'
import { FaqCategoryListRequest } from '@/types/api/FaqCategory'
import useFaqCategoryService from '@/utils/services/useFaqCategoryService'
import { Box, Button } from '@chakra-ui/react'
import { Form } from 'antd'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import { HiOutlineReply } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  catalogue_id: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useFaqCategoryService()
  const { search, setSearch } = useSearchContext<FaqCategoryListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const router = useRouter()
  // const onSearch = async () => {
  //   const d = await form.validateFields()
  //   await setSearch({
  //     catalogue_id: d.catalogue_id,
  //   })
  // }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <Button
        onClick={() => router.push(pages.faq.path)}
        borderRadius="0"
        colorScheme="teal"
        size="sm"
        leftIcon={<HiOutlineReply />}
      >
        問題列表
      </Button>
      {/* <TipIconButton
        label="search"
        icon={<HiOutlineReply />}
        onClick={() => router.push(pages.faq.path)}
        w={['100%', 'auto']}
        colorScheme="teal"
      /> */}
    </SearchBar>
  )
}

export default PageSearchBar
