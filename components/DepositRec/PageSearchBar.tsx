import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { DateRangeType, ProcessStatus } from '@/lib/enums'
import { DepositRecListRequest } from '@/types/api/DepositRec'
import useDepositRecService from '@/utils/services/useDepositRecService'
import useTransfer from '@/utils/useTransfer'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import DateRangeBtns from '../DateRangeBtns'
import SearchBarButtonRadios from '../SearchBarButtonRadios'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  sn: string
  acc: string
  status: ProcessStatus
  date_range: [Moment, Moment]
}

const cashflowOpts = [
  { label: '未付款', value: 1 },
  { label: '已付款', value: 2 },
  { label: '已过期', value: 3 },
]
function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useDepositRecService()
  const { search, setSearch } = useSearchContext<DepositRecListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const { dateRanges } = useTransfer()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      acc: d.acc,
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
    })
  }
  // 默认搜寻
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
        <InlineFormField name="date_range" label="申请日期" w="auto">
          <DatePicker.RangePicker allowClear />
        </InlineFormField>
        <InlineFormField name="date_range">
          <DateRangeBtns />
        </InlineFormField>
        <InlineFormField name="sn" label="储值单号">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="acc" label="会员帐号">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="status" label="金流商">
          <Select
            options={[{ label: '绿界', value: 0 }]}
            placeholder="请选择"
          />
        </InlineFormField>
        {/* <InlineFormField name="status" label="付款方式">
          <Select
            options={[
              { label: '全部', value: 0 },
              { label: 'ATM', value: 1 },
              { label: '信用卡', value: 2 },
            ]}
            placeholder="请选择"
          />
        </InlineFormField> */}

        <InlineFormField name="cashflow_status" label="状态" initialValue={1}>
          <SearchBarButtonRadios options={cashflowOpts} />
        </InlineFormField>
      </SearchBarContent>

      <Spacer />
      <TipIconButton
        label="search"
        icon={<HiSearch />}
        onClick={() => onSearch()}
        w={['100%', 'auto']}
        mb="10px"
        colorScheme="brand"
      />
    </SearchBar>
  )
}

export default PageSearchBar
