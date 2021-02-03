import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { ProcessStatus } from '@/lib/enums'
import { newsTypeOpts, processStatusOpts } from '@/lib/options'
import useActivityReviewService from '@/utils/services/useActivityReviewService'
import { Box, Spacer } from '@chakra-ui/react'
import { Form, Input, Select, DatePicker } from 'antd'
import moment, { Moment } from 'moment'
import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  title: string
  status: ProcessStatus
  // date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useActivityReviewService()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await fetchList({
      title: d.title,
      status: d.status,
      // start_at: d.date_range?.[0].unix(),
      // end_at: d.date_range?.[1].unix(),
    })
  }
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      {/* <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
        <DatePicker.RangePicker allowClear />
      </InlineFormField> */}
      <InlineFormField name="title" label="標題">
        <Input allowClear />
      </InlineFormField>
      <InlineFormField name="status" label="狀態">
        <Select options={processStatusOpts} placeholder="請選擇" />
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
