import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { gameOpts } from '@/lib/options'
import { DailyReportListRequest } from '@/types/api/DailyReport'
import { SportGame } from '@/types/api/SportGame'
import useDailyReportService from '@/utils/services/useDailyReportService'
import { Spacer } from '@chakra-ui/react'
import { Checkbox, DatePicker, Form, Input, Select } from 'antd'
import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  game_code: SportGame
  month: Moment
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useDailyReportService()
  const { search, setSearch } = useSearchContext<DailyReportListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      acc: d.acc,
      game_code: d.game_code,
      start_at: d.month?.startOf('month')?.unix(),
      end_at: d.month?.endOf('month')?.unix(),
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="month" label="日期" w={['auto', 'auto']}>
        <DatePicker picker="month" />
      </InlineFormField>
      <InlineFormField name="acc" label="帳號">
        <Input />
      </InlineFormField>
      <InlineFormField name="game_code" label="球種">
        <Select options={gameOpts} allowClear placeholder="全部" />
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
