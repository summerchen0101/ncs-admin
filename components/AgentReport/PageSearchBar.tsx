import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { DateRangeType, YesNo } from '@/lib/enums'
import { yesNoOpts } from '@/lib/options'
import { AgentReportListRequest } from '@/types/api/AgentReport'
import useAgentReportService from '@/utils/services/useAgentReportService'
import useTransfer from '@/utils/useTransfer'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import moment, { Moment } from 'moment'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import DateRangeBtns from '../DateRangeBtns'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  date_range: [Moment, Moment]
  is_test: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const [isSearchReady, setIsSearchReady] = useState(false)
  const { fetchList } = useAgentReportService()
  const { dateRanges, toDateTime } = useTransfer()
  const { search, setSearch } = useSearchContext<AgentReportListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const router = useRouter()

  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      acc: d.acc,
      start_at: d.date_range?.[0].startOf('day').unix() || 0,
      end_at: d.date_range?.[1].endOf('day').unix() || 0,
      agent_id: 0,
      is_test: d.is_test,
    })
  }

  // 默认搜寻
  useEffect(() => {
    form.setFieldsValue({ date_range: dateRanges[DateRangeType.Today] })
    setSearch((s) => ({
      start_at: dateRanges[DateRangeType.Today][0].unix(),
      end_at: dateRanges[DateRangeType.Today][1].unix(),
      is_test: YesNo.No,
    }))
  }, [])

  // query变化
  useEffect(() => {
    if (router.query?.start) {
      form.setFieldsValue({
        date_range: [
          moment(+router.query?.start * 1000),
          moment(+router.query?.end * 1000),
        ],
      })
      setSearch((s) => ({
        ...s,
        start_at: +router.query?.start,
        end_at: +router.query?.end,
      }))
    }
    setSearch((s) => ({ ...s, agent_id: +router.query?.pid }))
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
        <InlineFormField name="acc" label="帐号">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField
          name="is_test"
          label="测试帐号"
          initialValue={YesNo.No}
        >
          <Select options={[{ label: '全部', value: 0 }, ...yesNoOpts]} />
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
