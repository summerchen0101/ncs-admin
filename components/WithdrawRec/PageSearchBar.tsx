import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { ProcessStatus } from '@/lib/enums'
import { processStatusOpts } from '@/lib/options'
import { WithdrawRecListRequest } from '@/types/api/WithdrawRec'
import useWithdrawRecService from '@/utils/services/useWithdrawRecService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  title: string
  status: ProcessStatus
  // date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useWithdrawRecService()
  const { search, setSearch } = useSearchContext<WithdrawRecListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      title: d.title,
      status: d.status,
      // start_at: d.date_range?.[0].startOf('day').unix(),
      // end_at: d.date_range?.[1].endOf('day').unix(),
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="date_range" label="申請日期" w={['auto', 'auto']}>
        <DatePicker.RangePicker allowClear />
      </InlineFormField>
      <InlineFormField name="title" label="帳號">
        <Input allowClear />
      </InlineFormField>
      <InlineFormField name="status" label="狀態">
        <Select
          options={[{ label: '全部', value: 0 }, ...processStatusOpts]}
          placeholder="請選擇"
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
