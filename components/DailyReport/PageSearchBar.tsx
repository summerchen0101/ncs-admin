import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { YesNo } from '@/lib/enums'
import { gameOpts, yesNoOpts } from '@/lib/options'
import { DailyReportListRequest } from '@/types/api/DailyReport'
import { SportGame } from '@/types/api/SportGame'
import useDailyReportService from '@/utils/services/useDailyReportService'
import { Spacer } from '@chakra-ui/react'
import { Checkbox, DatePicker, Form, Input, Select } from 'antd'
import moment, { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  game_code: SportGame
  month: Moment
  is_test: number
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
      is_test: d.is_test,
    })
  }
  useEffect(() => {
    fetchList({ is_test: YesNo.No, ...search })
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField name="month" label="日期" w={['auto', 'auto']}>
          <DatePicker picker="month" />
        </InlineFormField>
        <InlineFormField name="acc" label="帐号">
          <Input />
        </InlineFormField>
        <InlineFormField name="game_code" label="球种">
          <Select options={gameOpts} allowClear placeholder="全部" />
        </InlineFormField>
        <InlineFormField
          name="is_test"
          label="测试帐号"
          initialValue={YesNo.No}
        >
          <Select options={[{ label: '全部', value: 0 }, ...yesNoOpts]} />
        </InlineFormField>
      </SearchBarContent>

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
