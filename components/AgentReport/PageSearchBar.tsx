import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberType, ProcessStatus } from '@/lib/enums'
import { accountingStatusOpts, gameOpts, memberTypeOpts } from '@/lib/options'
import { AgentReportListRequest } from '@/types/api/AgentReport'
import useAgentReportService from '@/utils/services/useAgentReportService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select, Checkbox } from 'antd'
import { Moment } from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import DateRangeBtns from '../DateRangeBtns'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useAgentReportService()
  const { search, setSearch } = useSearchContext<AgentReportListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const router = useRouter()
  const initRouterQuery = useMemo(
    () => ({
      agent_id: +router.query?.pid || 0,
    }),
    [router.query],
  )
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      acc: d.acc,
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
    })
  }
  useEffect(() => {
    fetchList({ ...search, ...initRouterQuery })
  }, [search, initRouterQuery])
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
        icon={<HiOutlineSearch />}
        onClick={() => onSearch()}
        w={['100%', 'auto']}
        colorScheme="orange"
      />
    </SearchBar>
  )
}

export default PageSearchBar
