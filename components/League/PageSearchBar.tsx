import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import useLeagueService from '@/utils/services/useLeagueService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  game_id: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useLeagueService()
  const [gameOpts] = useOptionsContext('game')
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await fetchList({ game_id: d.game_id })
  }
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="game_id" label="球種">
        <Select options={gameOpts} placeholder="請選擇" onChange={onSearch} />
      </InlineFormField>
    </SearchBar>
  )
}

export default PageSearchBar
