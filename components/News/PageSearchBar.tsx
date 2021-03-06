import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { newsTypeOpts } from '@/lib/options'
import { NewsListRequest } from '@/types/api/News'
import useNewsService from '@/utils/services/useNewsService'
import { Box, Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  title: string
  news_type: number
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useNewsService()
  const [form] = Form.useForm<SearchFormType>()
  const { search, setSearch } = useSearchContext<NewsListRequest>()
  const onSearch = async () => {
    const d = await form.validateFields()
    setSearch({
      title: d.title,
      news_type: +d.news_type,
      start_at: d.date_range?.[0].unix(),
      end_at: d.date_range?.[1].unix(),
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="title" label="標題">
        <Input allowClear />
      </InlineFormField>
      <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
        <DatePicker.RangePicker allowClear />
      </InlineFormField>
      <InlineFormField name="news_type" label="類型" initialValue={0}>
        <Box
          as={Select}
          options={[{ label: '全部', value: 0 }, ...newsTypeOpts]}
        />
      </InlineFormField>

      <Spacer />
      <TipIconButton
        label="search"
        icon={<HiOutlineSearch />}
        onClick={() => onSearch()}
        w={['100%', 'auto']}
        colorScheme="orange"
      />
    </SearchBar>
  )
}

export default PageSearchBar
