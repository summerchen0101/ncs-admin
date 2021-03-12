import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { AccountingStatus, DateRangeType, ProcessStatus } from '@/lib/enums'
import { processStatusOpts } from '@/lib/options'
import { WithdrawRecListRequest } from '@/types/api/WithdrawRec'
import useWithdrawRecService from '@/utils/services/useWithdrawRecService'
import useTransfer from '@/utils/useTransfer'
import {
  Box,
  Button,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { DatePicker, Form, Input, Radio, Select } from 'antd'
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
  { label: '已過期', value: 3 },
]
function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useWithdrawRecService()
  const { search, setSearch } = useSearchContext<WithdrawRecListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const [currentTab, setCurrentTab] = useState(1)
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
    <>
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

          <InlineFormField name="cashflow_status" label="狀態" initialValue={1}>
            <SearchBarButtonRadios options={cashflowOpts} />
          </InlineFormField>
          {/* <InlineFormField name="status" label="訂單狀態">
            <Select
              options={[{ label: '全部', value: 0 }, ...processStatusOpts]}
              placeholder="請選擇"
            />
          </InlineFormField> */}
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
      {/* <Stack direction="row" mb="5px">
        {cashflowOpts.map((t) => (
          <Button
            key={t.value}
            colorScheme="brand"
            borderRadius="3px"
            bg={t.value === currentTab ? 'brand.500' : 'brand.400'}
            size="sm"
          >
            {t.label}
          </Button>
        ))}
      </Stack> */}
    </>
  )
}

export default PageSearchBar
