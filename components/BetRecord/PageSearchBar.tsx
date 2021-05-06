import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { AccountingStatus, DateRangeType } from '@/lib/enums'
import { accountingStatusOpts } from '@/lib/options'
import { BetRecordListRequest } from '@/types/api/BetRecord'
import useBetRecordService from '@/utils/services/useBetRecordService'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Spacer, Text } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import _ from 'lodash'
import { Moment } from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import DateRangeBtns from '../DateRangeBtns'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  accounting_status: AccountingStatus
  date_range: [Moment, Moment]
  sns: string
  handicap_id: string
  score: string
}

function createScoreOpts() {
  const scoreOpts = []
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      scoreOpts.push({ label: `${i}-${j}`, value: `${i},${j}` })
    }
  }
  return scoreOpts
}
function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const [isSearchReady, setIsSearchReady] = useState(false)
  const { fetchList } = useBetRecordService()
  const { setPage } = usePaginateContext()
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
    setPage(1)
    await setSearch({
      acc: d.acc,
      handicap_id: +d.handicap_id,
      accounting_status: d.accounting_status,
      start_at: d.date_range?.[0]?.startOf('day').unix(),
      end_at: d.date_range?.[1]?.endOf('day').unix(),
      sns,
      home_point: +d.score.split(',')?.[0],
      away_point: +d.score.split(',')?.[1],
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

  // query变化
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
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
          <DatePicker.RangePicker allowClear />
        </InlineFormField>
        <InlineFormField name="date_range">
          <DateRangeBtns />
        </InlineFormField>
        <InlineFormField
          name="accounting_status"
          label="结帐状态"
          initialValue={0}
        >
          <Select
            options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
          />
        </InlineFormField>
        <InlineFormField name="acc" label="帐号">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField label="主客比分" name="score" initialValue="-1,-1">
          <Select
            options={[{ label: '全部', value: '-1,-1' }, ...createScoreOpts()]}
          />
        </InlineFormField>

        <InlineFormField name="handicap_id" label="赛事编号">
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
