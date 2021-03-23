import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useDataContext } from '@/context/DataContext'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { League, LeagueListRequest } from '@/types/api/League'
import useLeagueService from '@/utils/services/useLeagueService'
import useOptionsService from '@/utils/services/useOptionsService'
import { Spacer } from '@chakra-ui/react'
import { Form, Select } from 'antd'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  game_code: string
  group_code: string
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useLeagueService()
  const { setList } = useDataContext<League>()
  const { setSearch, search } = useSearchContext<LeagueListRequest>()
  const [gameOpts] = useOptionsContext().game
  const { fetchLeagueGroupOptions } = useOptionsService()
  const [leagueGroupOpts, setLeagueGroupOpts] = useOptionsContext().leagueGroup
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    setSearch({ game_code: d.game_code, group_code: d.group_code })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])

  const handleGameChanged = (value: string) => {
    setLeagueGroupOpts([])
    setList([])
    form.resetFields(['group_code'])
    fetchLeagueGroupOptions(value)
  }

  return (
    <SearchBar isOpen={visible} form={form}>
      <InlineFormField
        name="game_code"
        label="球种"
        rules={[{ required: true }]}
      >
        <Select
          options={gameOpts}
          placeholder="请选择"
          onChange={handleGameChanged}
        />
      </InlineFormField>
      <InlineFormField name="group_code" label="联盟群组">
        <Select options={leagueGroupOpts} placeholder="请选择" />
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
