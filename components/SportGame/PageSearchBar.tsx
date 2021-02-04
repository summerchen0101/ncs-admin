import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import useSportGameService from '@/utils/services/useSportGameService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  country_id: number
  sport_id: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useSportGameService()
  const [countryOpts] = useOptionsContext('country')
  const [sportOpts] = useOptionsContext('sport')
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await fetchList(d)
  }
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="country_id" label="國家">
        <Select options={countryOpts} allowClear placeholder="請選擇" />
      </InlineFormField>
      <InlineFormField name="sport_id" label="運動">
        <Select options={sportOpts} allowClear placeholder="請選擇" />
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