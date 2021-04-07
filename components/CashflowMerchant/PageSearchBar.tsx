import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { CashflowMerchantListRequest } from '@/types/api/CashflowMerchant'
import useCashflowMerchantService from '@/utils/services/useCashflowMerchantService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import SearchBarButtonRadios from '../SearchBarButtonRadios'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  name?: string
  sys_code?: string
  group_code?: string
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useCashflowMerchantService()
  const [cashflowGroupOpts] = useOptionsContext().cashflowGroup
  const [thirdPartyOpts] = useOptionsContext().thirdParty
  const { search, setSearch } = useSearchContext<CashflowMerchantListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      name: d.name,
      sys_code: d.sys_code,
      group_code: d.group_code,
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField name="name" label="名称">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="sys_code" label="金流" initialValue={0}>
          <Select options={[{ label: '全部', value: 0 }, ...thirdPartyOpts]} />
        </InlineFormField>
        <InlineFormField name="sys_code" label="轮替群组" initialValue={0}>
          <Select
            options={[{ label: '全部', value: 0 }, ...cashflowGroupOpts]}
          />
        </InlineFormField>
      </SearchBarContent>

      <Spacer />
      <TipIconButton
        label="search"
        icon={<HiSearch />}
        onClick={() => onSearch()}
        w={['100%', 'auto']}
        mb="10px"
        colorScheme="brand"
      />
    </SearchBar>
  )
}

export default PageSearchBar
