import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { gameOpts } from '@/lib/options'
import { GameReportListRequest } from '@/types/api/GameReport'
import useGameReportService from '@/utils/services/useGameReportService'
import { Spacer } from '@chakra-ui/react'
import { Checkbox, DatePicker, Form, Input } from 'antd'
import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  content: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useGameReportService()
  const { search, setSearch } = useSearchContext<GameReportListRequest>()
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
      <InlineFormField
        name="date_range"
        label="月份"
        initialValue={moment()}
        w={['auto', 'auto']}
      >
        <DatePicker picker="month" />
        {/* <DatePicker picker="year" /> */}
      </InlineFormField>

      <InlineFormField name="acc" label="帳號">
        <Input />
      </InlineFormField>
      <InlineFormField
        name="game_code"
        label="球種"
        initialValue={gameOpts.map((t) => t.value)}
      >
        <Checkbox.Group options={gameOpts} />
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
