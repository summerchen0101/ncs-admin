import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useDataContext } from '@/context/DataContext'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { Team } from '@/types/api/Team'
import useOptionsService from '@/utils/services/useOptionsService'
import { Form, Select } from 'antd'
import React from 'react'

type SearchFormType = {
  game_id: number
  league_id: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { setList, setSearch, search } = useDataContext<Team>()
  const { fetchLeagueOptions } = useOptionsService()
  const [gameOpts] = useOptionsContext('game')
  const [leagueOpts, setLeagueOpts] = useOptionsContext('league')
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    setSearch({ league_id: d.league_id })
  }
  const handleGameChanged = (game_id: number) => {
    setLeagueOpts([])
    setList([])
    fetchLeagueOptions(game_id)
    form.resetFields(['league_id'])
  }
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="game_id" label="球種">
        <Select
          options={gameOpts}
          placeholder="請選擇"
          onChange={handleGameChanged}
        />
      </InlineFormField>
      <InlineFormField name="league_id" label="聯盟">
        <Select options={leagueOpts} placeholder="請選擇" onChange={onSearch} />
      </InlineFormField>
    </SearchBar>
  )
}

export default PageSearchBar
