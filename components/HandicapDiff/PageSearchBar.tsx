import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { gameOpts, playOpts, sectionOpts } from '@/lib/options'
import { DefaultBetListRequest } from '@/types/api/DefaultBet'
import useDefaultBetService from '@/utils/services/useDefaultBetService'
import { Spacer } from '@chakra-ui/react'
import { Form, Select } from 'antd'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  country_code: string
  section_code: string
  sport_code: string
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useDefaultBetService()
  const { search, setSearch } = useSearchContext<DefaultBetListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({})
  }
  useEffect(() => {
    // fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="country_code" label="球種">
        <Select options={gameOpts} allowClear placeholder="請選擇" />
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
