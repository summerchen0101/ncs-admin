import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberContactListRequest } from '@/types/api/MemberContact'
import useMemberContactService from '@/utils/services/useMemberContactService'
import { Spacer, Stack, VStack } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'
import { confirmStatusOpts } from '@/lib/options'
import SearchBarContent from '../SearchBarContent'

type SearchFormType = {
  acc: string
  mobile: string
  email: string
  line_id: string
  wechat_id: string
  qq_id: string
  telegram_id: string
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useMemberContactService()
  const { search, setSearch } = useSearchContext<MemberContactListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch(d)
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField name="acc" label="會員帳號">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="email" label="郵箱">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="mobile" label="手機">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="line_id" label="LINE">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="wechat_id" label="微信">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="qq_id" label="QQ">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="telegram_id" label="Telegram">
          <Input allowClear />
        </InlineFormField>
      </SearchBarContent>

      {/* <InlineFormField name="is_confirm" label="審核狀態" initialValue={0}>
        <Select options={[{ label: '全部', value: 0 }, ...confirmStatusOpts]} />
      </InlineFormField> */}

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
