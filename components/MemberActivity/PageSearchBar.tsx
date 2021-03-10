import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useGlobalContext } from '@/context/GlobalContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { DateRangeType } from '@/lib/enums'
import { MemberActivityListRequest } from '@/types/api/MemberActivity'
import useMemberActivityService from '@/utils/services/useMemberActivityService'
import useTransfer from '@/utils/useTransfer'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input } from 'antd'
import { Moment } from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import DateRangeBtns from '../DateRangeBtns'
import TipIconButton from '../TipIconButton'

type SearchFormProps = {
  acc: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useMemberActivityService()
  const { search, setSearch } = useSearchContext<MemberActivityListRequest>()
  const [form] = Form.useForm<SearchFormProps>()
  const [isSearchReady, setIsSearchReady] = useState(false)
  const router = useRouter()
  const { dateRanges } = useTransfer()
  const { user } = useGlobalContext()

  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      agent_id: user?.id,
      acc: d.acc,
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

  // query變化
  useEffect(() => {
    setSearch((s) => ({ ...s, agent_id: +router.query?.pid || user?.id }))
    setIsSearchReady(true)
  }, [router.query])

  useEffect(() => {
    isSearchReady && fetchList(search)
  }, [search, isSearchReady])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
        <DatePicker.RangePicker allowClear />
      </InlineFormField>
      <InlineFormField name="date_range" w={['auto', '300px']}>
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
        colorScheme="brand"
      />
    </SearchBar>
  )
}

export default PageSearchBar
