import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useGlobalContext } from '@/context/GlobalContext'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberType, Status } from '@/lib/enums'
import { memberTypeOpts, statusOpts } from '@/lib/options'
import { MemberListRequest } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import { Spacer, Stack, VStack } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo } from 'react'
import { HiSearch } from 'react-icons/hi'
import ColorTagSelector from '../ColorTagSelector'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  member_type: MemberType
  is_active: Status
  date_range: [Moment, Moment]
  tag_ids: number[]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const [tagOpts] = useOptionsContext().tag
  const { fetchList } = useMemberService()
  const { search, setSearch } = useSearchContext<MemberListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const { user } = useGlobalContext()
  const router = useRouter()
  const initRouterQuery = useMemo(
    () => ({
      member_type: +router.query?.type || MemberType.Agent,
      agent_id: +router.query?.pid || user?.id,
    }),
    [router.query],
  )
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
      member_type: d.member_type,
      acc: d.acc,
      is_active: d.is_active,
      agent_id: user?.id,
      tag_ids: d.tag_ids,
    })
  }

  useEffect(() => {
    setSearch(initRouterQuery)
  }, [router])

  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField
          name="member_type"
          label="类型"
          initialValue={initRouterQuery.member_type}
        >
          <Select options={memberTypeOpts} />
        </InlineFormField>
        <InlineFormField name="acc" label="帐号">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="is_active" label="状态" initialValue={0}>
          <Select options={[{ label: '全部', value: 0 }, ...statusOpts]} />
        </InlineFormField>
        <InlineFormField
          name="date_range"
          label="注册日期"
          w={['auto', 'auto']}
        >
          <DatePicker.RangePicker allowClear />
        </InlineFormField>
        {tagOpts.length > 0 && (
          <InlineFormField name="tag_ids" label="标籤" w="auto" minW="220px">
            <ColorTagSelector options={tagOpts} />
          </InlineFormField>
        )}
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
  )
}

export default PageSearchBar
