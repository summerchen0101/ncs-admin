import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { DateRangeType } from '@/lib/enums'
import { AgentReportListRequest } from '@/types/api/AgentReport'
import useAgentReportService from '@/utils/services/useAgentReportService'
import useTransfer from '@/utils/useTransfer'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input } from 'antd'
import moment, { Moment } from 'moment'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo } from 'react'
import { HiSearch } from 'react-icons/hi'
import DateRangeBtns from '../DateRangeBtns'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useAgentReportService()
  const { dateRanges, toDateTime } = useTransfer()
  const { search, setSearch } = useSearchContext<AgentReportListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const router = useRouter()
  const queryAgentId = +router.query?.pid || 0
  const queryStart = useMemo(() => +router.query?.start || 0, [router.query])
  const queryEnd = useMemo(() => +router.query?.end || 0, [router.query])

  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      acc: d.acc,
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
      agent_id: queryAgentId,
    })
  }

  useEffect(() => {
    if (queryStart && queryEnd) {
      form.setFieldsValue({
        date_range: [moment(queryStart * 1000), moment(queryEnd * 1000)],
      })
      setSearch((s) => ({ ...s, start_at: queryStart, end_at: queryEnd }))
    }
  }, [queryStart, queryEnd])

  useEffect(() => {
    setSearch((s) => ({ ...s, agent_id: queryAgentId }))
  }, [queryAgentId])

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
