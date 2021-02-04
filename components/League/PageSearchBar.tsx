import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useDataContext } from '@/context/DataContext'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { League, LeagueListRequest } from '@/types/api/League'
import useLeagueService from '@/utils/services/useLeagueService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  game_id: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useLeagueService()
  const { setSearch, search } = useSearchContext<LeagueListRequest>()
  const [gameOpts] = useOptionsContext('game')
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    console.log(d)
    setSearch({ game_id: d.game_id })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="game_id" label="球種">
        <Select options={gameOpts} placeholder="請選擇" onChange={onSearch} />
      </InlineFormField>
    </SearchBar>
  )
}

export default PageSearchBar
