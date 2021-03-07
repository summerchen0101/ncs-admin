import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { playOpts, sectionOpts } from '@/lib/options'
import { OddsListRequest } from '@/types/api/Odds'
import useOddsService from '@/utils/services/useOddsService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  game_code: string
  play_code: string
  section_code: string
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useOddsService()
  const [gameOpts] = useOptionsContext('game')
  const { search, setSearch } = useSearchContext<OddsListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      game_code: d.game_code,
      play_code: d.play_code,
      section_code: d.section_code,
    })
  }
  // const handleGameChanged = (game_code: string) => {
  //   setLeagueOpts([])
  //   setList([])
  //   fetchLeagueOptions(game_code)
  //   form.resetFields(['league_id'])
  // }
  useEffect(() => {
    if (search?.game_code && search?.play_code && search?.section_code) {
      fetchList(search)
    }
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField
        name="game_code"
        label="球種"
        rules={[{ required: true }]}
      >
        <Select
          options={gameOpts}
          placeholder="請選擇"
          // onChange={handleGameChanged}
        />
      </InlineFormField>
      <InlineFormField
        name="section_code"
        label="場次"
        rules={[{ required: true }]}
      >
        <Select
          options={sectionOpts}
          placeholder="請選擇"
          // onChange={handleGameChanged}
        />
      </InlineFormField>
      <InlineFormField
        name="play_code"
        label="玩法"
        rules={[{ required: true }]}
      >
        <Select
          options={playOpts}
          placeholder="請選擇"
          // onChange={handleGameChanged}
        />
      </InlineFormField>

      <Spacer />
      <TipIconButton
        label="search"
        icon={<HiSearch />}
        onClick={() => onSearch()}
        w={['100%', 'auto']}
        colorScheme="orange"
      />
    </SearchBar>
  )
}

export default PageSearchBar
