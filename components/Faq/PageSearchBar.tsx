import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import pages from '@/lib/pages'
import { FaqListRequest } from '@/types/api/Faq'
import useFaqService from '@/utils/services/useFaqService'
import { Box, Spacer, Button } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import { HiOutlineArrowRight, HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  catalogue_id: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useFaqService()
  const [categoryOpts] = useOptionsContext('faqCategory')
  const { search, setSearch } = useSearchContext<FaqListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const router = useRouter()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      catalogue_id: d.catalogue_id,
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="catalogue_id" label="類別" initialValue={0}>
        <Select
          options={[{ label: '全部', value: 0 }, ...categoryOpts]}
          onChange={onSearch}
        />
      </InlineFormField>

      <Spacer />
      <Button
        onClick={() => router.push(pages.faqCategory.path)}
        borderRadius="0"
        colorScheme="teal"
        size="sm"
      >
        類別管理
      </Button>
      {/* <TipIconButton
        label="search"
        icon={<HiOutlineSearch />}
        onClick={() => onSearch()}
        w={['100%', 'auto']}
        colorScheme="orange"
      /> */}
    </SearchBar>
  )
}

export default PageSearchBar
