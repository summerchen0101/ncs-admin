import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { RealNameListRequest } from '@/types/api/RealName'
import useRealNameService from '@/utils/services/useRealNameService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'
import { confirmStatusOpts } from '@/lib/options'

type SearchFormType = {
  acc: string
  is_confirm: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useRealNameService()
  const { search, setSearch } = useSearchContext<RealNameListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      acc: d.acc,
      is_confirm: d.is_confirm,
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="acc" label="會員帳號">
        <Input allowClear />
      </InlineFormField>
      <InlineFormField name="is_confirm" label="審核狀態" initialValue={0}>
        <Select options={[{ label: '全部', value: 0 }, ...confirmStatusOpts]} />
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
