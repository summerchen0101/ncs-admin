import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { blockStatusOpts, statusOpts } from '@/lib/options'
import { SubAccListRequest } from '@/types/api/MemberShadow'
import useSubAccService from '@/utils/services/useMemberShadowService'
import { Box, Spacer } from '@chakra-ui/react'
import { Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  is_active: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const [roleOpts] = useOptionsContext('role')
  const { fetchList } = useSubAccService()
  const { search, setSearch } = useSearchContext<SubAccListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const f = await form.validateFields()
    await setSearch({
      acc: f.acc,
      is_active: f.is_active,
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
      <InlineFormField name="is_active" label="啟用狀態" initialValue={0}>
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
