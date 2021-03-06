import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { blockStatusOpts, statusOpts } from '@/lib/options'
import { AdminUserListRequest } from '@/types/api/AdminUser'
import useAdminUserService from '@/utils/services/useAdminUserService'
import { Box, Spacer } from '@chakra-ui/react'
import { Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  role_id: number
  is_active: number
  status: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const [roleOpts] = useOptionsContext('role')
  const { fetchList } = useAdminUserService()
  const { search, setSearch } = useSearchContext<AdminUserListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const f = await form.validateFields()
    await setSearch({
      acc: f.acc,
      is_active: f.is_active,
      status: f.status,
      role_id: f.role_id,
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="acc" label="管理者帳號">
        <Input placeholder="請輸入內容" allowClear />
      </InlineFormField>
      <InlineFormField name="role_id" label="管理者角色" initialValue={0}>
        <Box as={Select} options={[{ label: '全部', value: 0 }, ...roleOpts]} />
      </InlineFormField>
      <InlineFormField name="status" label="鎖定狀態" initialValue={0}>
        <Box
          as={Select}
          options={[{ label: '全部', value: 0 }, ...blockStatusOpts]}
        />
      </InlineFormField>
      <InlineFormField name="is_active" label="啟用狀態" initialValue={0}>
        <Box
          as={Select}
          options={[{ label: '全部', value: 0 }, ...statusOpts]}
        />
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
