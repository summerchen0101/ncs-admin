import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberType } from '@/lib/enums'
import { memberTypeOpts } from '@/lib/options'
import { MemberListRequest } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  member_type: MemberType
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useMemberService()
  const { search, setSearch } = useSearchContext<MemberListRequest>()
  const [form] = Form.useForm<SearchFormType>()

  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      member_type: d.member_type,
      acc: d.acc,
    })
  }

  useEffect(() => {
    setSearch({ member_type: MemberType.Agent })
  }, [])

  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField
        name="member_type"
        label="類型"
        initialValue={MemberType.Agent}
      >
        <Select options={memberTypeOpts} onChange={onSearch} />
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
