import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { DateRangeType, ProcessStatus } from '@/lib/enums'
import { processStatusOpts } from '@/lib/options'
import { WithdrawRecListRequest } from '@/types/api/WithdrawRec'
import useWithdrawRecService from '@/utils/services/useWithdrawRecService'
import useTransfer from '@/utils/useTransfer'
import { Box, Spacer, Stack } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import DateRangeBtns from '../DateRangeBtns'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  sn: string
  acc: string
  status: ProcessStatus
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useWithdrawRecService()
  const { search, setSearch } = useSearchContext<WithdrawRecListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const { dateRanges } = useTransfer()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      sn: d.sn,
      acc: d.acc,
      status: d.status,
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
    })
  }
  // 預設搜尋
  useEffect(() => {
    form.setFieldsValue({ date_range: dateRanges[DateRangeType.Today] })
    setSearch((s) => ({
      start_at: dateRanges[DateRangeType.Today][0].unix(),
      end_at: dateRanges[DateRangeType.Today][1].unix(),
    }))
  }, [])
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField name="date_range" label="申請日期" w="auto">
          <DatePicker.RangePicker allowClear />
        </InlineFormField>
        <InlineFormField name="date_range" w={['auto', '300px']}>
          <DateRangeBtns />
        </InlineFormField>
        <InlineFormField name="sn" label="儲值單號">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="acc" label="會員帳號">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="status" label="金流來源">
          <Select
            options={[{ label: '綠界', value: 0 }]}
            placeholder="請選擇"
          />
        </InlineFormField>
        {/* <InlineFormField name="status" label="付款方式">
          <Select
            options={[
              { label: '全部', value: 0 },
              { label: 'ATM', value: 1 },
              { label: '信用卡', value: 2 },
            ]}
            placeholder="請選擇"
          />
        </InlineFormField> */}

        <InlineFormField name="status" label="狀態">
          <Select
            options={[{ label: '全部', value: 0 }, ...processStatusOpts]}
            placeholder="請選擇"
          />
        </InlineFormField>
      </SearchBarContent>

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
