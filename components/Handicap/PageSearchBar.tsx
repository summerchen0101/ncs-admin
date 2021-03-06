import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { HandicapListRequest } from '@/types/api/Handicap'
import useHandicapService from '@/utils/services/useHandicapService'
import useOptionsService from '@/utils/services/useOptionsService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  game_code: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useHandicapService()
  const [gameOpts] = useOptionsContext('game')
  const { search, setSearch } = useSearchContext<HandicapListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      start_at: d.date_range?.[0].unix(),
      end_at: d.date_range?.[1].unix(),
      game_code: d.game_code,
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="game_code" label="球種">
        <Select options={gameOpts} onChange={onSearch} />
      </InlineFormField>
      <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
        <DatePicker.RangePicker allowClear />
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
