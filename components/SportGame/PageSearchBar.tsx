import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import useSportGameService from '@/utils/services/useSportGameService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input } from 'antd'
import { Moment } from 'moment'
import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  content: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useSportGameService()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await fetchList()
  }
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
        <DatePicker.RangePicker allowClear />
      </InlineFormField>
      <InlineFormField name="content" label="內容">
        <Input allowClear />
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
