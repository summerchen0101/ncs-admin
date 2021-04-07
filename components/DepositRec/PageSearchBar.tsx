import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { DateRangeType, ProcessStatus } from '@/lib/enums'
import { processStatusOpts, yesNoOpts } from '@/lib/options'
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
  sn?: string
  merchant_sn?: string
  acc?: string
  is_first?: number
  merchant_id?: string
  status?: ProcessStatus
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
  const { setPage } = usePaginateContext()
  const [cashflowMerchantOpts] = useOptionsContext().cashflowMerchant
  const { search, setSearch } = useSearchContext<DepositRecListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const [currentTab, setCurrentTab] = useState(1)
  const { dateRanges } = useTransfer()
  const onSearch = async () => {
    const d = await form.validateFields()
    setPage(1)
    await setSearch({
      merchant_sn: d.merchant_sn,
      sn: d.sn,
      acc: d.acc,
      merchant_id: d.merchant_id,
      status: d.status,
      is_first: d.is_first,
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
    })
  }
  // 默认搜寻
  useEffect(() => {
    onSearch()
  }, [])
  useEffect(() => {
    search && fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField
          name="date_range"
          label="申请日期"
          w="auto"
          initialValue={dateRanges[DateRangeType.Today]}
        >
          <DatePicker.RangePicker allowClear />
        </InlineFormField>
        <InlineFormField name="date_range">
          <DateRangeBtns />
        </InlineFormField>
        <InlineFormField name="sn" label="单号(本地)">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="merchant_sn" label="单号(金流)">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="acc" label="会员帐号">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="merchant_id" label="金流商户" initialValue={0}>
          <Select
            options={[{ label: '全部', value: 0 }, ...cashflowMerchantOpts]}
            placeholder="请选择"
          />
        </InlineFormField>
        <InlineFormField name="status" label="状态" initialValue={0}>
          <Select
            options={[{ label: '全部', value: 0 }, ...processStatusOpts]}
            placeholder="请选择"
          />
        </InlineFormField>
        <InlineFormField name="is_first" label="首次储值" initialValue={0}>
          <Select
            options={[{ label: '全部', value: 0 }, ...yesNoOpts]}
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
