import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberType, Status } from '@/lib/enums'
import { memberTypeOpts, statusOpts } from '@/lib/options'
import { MemberListRequest } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  member_type: MemberType
  is_active: Status
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useMemberService()
  const { search, setSearch } = useSearchContext<MemberListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const router = useRouter()
  const initRouterQuery = useMemo(
    () => ({
      member_type: +router.query?.type || MemberType.Agent,
      agent_id: +router.query?.pid || 0,
    }),
    [router.query],
  )
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      member_type: d.member_type,
      acc: d.acc,
      is_active: d.is_active,
    })
  }

  useEffect(() => {
    setSearch(initRouterQuery)
  }, [router])

  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField
        name="member_type"
        label="類型"
        initialValue={initRouterQuery.member_type}
      >
        <Select options={memberTypeOpts} />
      </InlineFormField>
      <InlineFormField name="acc" label="帳號">
        <Input allowClear />
      </InlineFormField>
      <InlineFormField name="is_active" label="狀態" initialValue={0}>
        <Select options={[{ label: '全部', value: 0 }, ...statusOpts]} />
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
