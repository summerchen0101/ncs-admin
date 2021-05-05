import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useDataContext } from '@/context/DataContext'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { gameOpts } from '@/lib/options'
import {
  LeagueTranslate,
  LeagueTranslateListRequest,
} from '@/types/api/LeagueTranslate'
import useOptionsService from '@/utils/services/useOptionsService'
import useLeagueTranslateService from '@/utils/services/useLeagueTranslateService'
import { Box, Spacer } from '@chakra-ui/layout'
import { Form, Select } from 'antd'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'
import { SportGame } from '@/lib/enums'

type SearchFormType = {
  game_code: string
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { setList } = useDataContext<LeagueTranslate>()
  const { setSearch, search } = useSearchContext<LeagueTranslateListRequest>()
  const { fetchLeagueOptions } = useOptionsService()
  const { fetchList } = useLeagueTranslateService()
  // const [gameOpts] = useOptionsContext().game
  const [leagueOpts, setLeagueOpts] = useOptionsContext().league
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    setSearch({ game_code: d.game_code })
  }
  const handleGameChanged = (game_code: string) => {
    setLeagueOpts([])
    setList([])
    fetchLeagueOptions(game_code)
    form.resetFields(['league_id'])
  }

  useEffect(() => {
    onSearch()
  }, [])

  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <InlineFormField
        name="game_code"
        label="球种"
        rules={[{ required: true }]}
        initialValue={SportGame.Soccor}
      >
        <Select
          options={gameOpts}
          placeholder="请选择"
          onChange={handleGameChanged}
        />
      </InlineFormField>

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
