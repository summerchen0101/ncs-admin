import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberLogListRequest } from '@/types/api/MemberLog'
import useMemberLogService from '@/utils/services/useMemberLogService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import DateRangeBtns from '../DateRangeBtns'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  ip: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useMemberLogService()
  const { search, setSearch } = useSearchContext<MemberLogListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      acc: d.acc,
      ip: d.ip,
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
        <DatePicker.RangePicker allowClear />
      </InlineFormField>
      <InlineFormField name="date_range">
        <DateRangeBtns />
      </InlineFormField>
      <InlineFormField name="acc" label="帳號">
        <Input allowClear />
      </InlineFormField>
      <InlineFormField name="ip" label="IP">
        <Input allowClear />
      </InlineFormField>

      <Spacer />
      <TipIconButton
        label="search"
        icon={<HiSearch />}
        onClick={() => onSearch()}
        w={['100%', 'auto']}
        colorScheme="orange"
      />
    </SearchBar>
  )
}

export default PageSearchBar
