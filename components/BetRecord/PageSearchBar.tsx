import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { AccountingStatus, DateRangeType, ProcessStatus } from '@/lib/enums'
import { accountingStatusOpts } from '@/lib/options'
import { BetRecordListRequest } from '@/types/api/BetRecord'
import useBetRecordService from '@/utils/services/useBetRecordService'
import { Box, Flex, HStack, Spacer, Stack, VStack } from '@chakra-ui/react'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import menu from '@/lib/menu'
import DateRangeBtns from '../DateRangeBtns'
import useTransfer from '@/utils/useTransfer'

type SearchFormType = {
  acc: string
  accounting_status: AccountingStatus
  date_range: [Moment, Moment]
  sns: string
  handicap_id: string
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const [isSearchReady, setIsSearchReady] = useState(false)
  const { fetchList } = useBetRecordService()
  const { search, setSearch } = useSearchContext<BetRecordListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const router = useRouter()
  const { dateRanges } = useTransfer()

  const onSearch = async () => {
    const d = await form.validateFields()
    const sns = d.sns
      ? _(d.sns.split(',').map((t) => t.trim()))
          .uniq()
          .compact()
          .value()
      : undefined
    await setSearch({
      acc: d.acc,
      handicap_id: +d.handicap_id,
      accounting_status: d.accounting_status,
      start_at: d.date_range?.[0]?.startOf('day').unix(),
      end_at: d.date_range?.[1]?.endOf('day').unix(),
      sns,
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

  // query變化
  useEffect(() => {
    if (router.query?.hid) {
      form.setFieldsValue({
        handicap_id: router.query?.hid as string,
        date_range: [null, null],
      })
      setSearch((s) => ({ handicap_id: +router.query?.hid }))
    }
    setIsSearchReady(true)
  }, [router.query])

  useEffect(() => {
    isSearchReady && fetchList(search)
  }, [search, isSearchReady])

  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <VStack
        w={['auto', '90%']}
        alignItems="start"
        spacing="3"
        // overflowX="auto"
      >
        <Stack direction={['column', 'row']} w={['full', 'auto']}>
          <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
            <DatePicker.RangePicker allowClear />
          </InlineFormField>
          <InlineFormField name="date_range" w={['auto', '300px']}>
            <DateRangeBtns />
          </InlineFormField>
          <InlineFormField
            name="accounting_status"
            label="結帳狀態"
            initialValue={0}
          >
            <Select
              options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
            />
          </InlineFormField>
        </Stack>
        <Stack direction={['column', 'row']} w={['full', 'auto']}>
          <InlineFormField name="acc" label="帳號">
            <Input allowClear />
          </InlineFormField>

          <InlineFormField name="handicap_id" label="賽事編號">
            <Input allowClear />
          </InlineFormField>
          <InlineFormField
            name="sns"
            label="注单编号"
            help="＊多笔可用「,」隔开 "
            w={['full', '450px']}
          >
            <Input allowClear placeholder="ex: ab12342,fa2131" />
          </InlineFormField>
        </Stack>
      </VStack>
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
