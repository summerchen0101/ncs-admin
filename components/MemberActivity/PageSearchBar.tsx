import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberActivityListRequest } from '@/types/api/MemberActivity'
import useMemberActivityService from '@/utils/services/useMemberActivityService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input } from 'antd'
import { Moment } from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormProps = {
  agent_id: number
  acc: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useMemberActivityService()
  const { search, setSearch } = useSearchContext<MemberActivityListRequest>()
  const [form] = Form.useForm<SearchFormProps>()
  const router = useRouter()
  const initRouterQuery = useMemo(
    () => ({
      agent_id: +router.query?.pid || 0,
    }),
    [router.query],
  )

  // useEffect(() => {
  //   setSearch((s) => ({ ...s, ...initRouterQuery }))
  // }, [initRouterQuery])

  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      agent_id: d.agent_id,
      acc: d.acc,
      start_at: d.date_range?.[0].unix(),
      end_at: d.date_range?.[1].unix(),
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
