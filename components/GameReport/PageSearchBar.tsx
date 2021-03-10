import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberType, ProcessStatus } from '@/lib/enums'
import { accountingStatusOpts, memberTypeOpts } from '@/lib/options'
import { GameReportListRequest } from '@/types/api/GameReport'
import useGameReportService from '@/utils/services/useGameReportService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  content: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useGameReportService()
  const { search, setSearch } = useSearchContext<GameReportListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({})
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
        <DatePicker.RangePicker allowClear />
      </InlineFormField>
      <InlineFormField
        name="member_type"
        label="會員類型"
        initialValue={MemberType.Agent}
      >
        <Select options={memberTypeOpts} onChange={onSearch} />
      </InlineFormField>
      <InlineFormField
        name="accounting_status"
        label="結帳狀態"
        initialValue={ProcessStatus.Finish}
      >
        <Select
          options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
          onChange={onSearch}
        />
      </InlineFormField>

      <Spacer />
      <TipIconButton
        label="search"
        icon={<HiSearch />}
        onClick={() => onSearch()}
        w={['100%', 'auto']}
        colorScheme="brand"
      />
    </SearchBar>
  )
}

export default PageSearchBar
