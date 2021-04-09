import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePaginateContext } from '@/context/PaginateContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { AccountingStatus, DateRangeType, GameStatus } from '@/lib/enums'
import { accountingStatusOpts, gameOpts, gameStatusOpts } from '@/lib/options'
import { OptionType } from '@/types'
import { HandicapListRequest } from '@/types/api/Handicap'
import useHandicapService from '@/utils/services/useHandicapService'
import useOptionsService from '@/utils/services/useOptionsService'
import useTransfer from '@/utils/useTransfer'
import { Spacer, Stack } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import DateRangeBtns from '../DateRangeBtns'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  game_code: string
  game_status: GameStatus
  half_game_status: GameStatus
  date_range: [Moment, Moment]
  accounting_status: AccountingStatus
  half_accounting_status: AccountingStatus
  sort: string
}

const sortByOpts: OptionType[] = [
  // { label: '默认', value: 0 },
  { label: '开赛时间', value: 'play_at asc' },
  { label: '注单量', value: 'bet_count desc' },
  { label: '累计注额', value: 'bet_sum desc' },
]

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const [isSearchReady, setIsSearchReady] = useState(false)
  const router = useRouter()
  const { dateRanges } = useTransfer()
  const { fetchList } = useHandicapService()
  const { setPage } = usePaginateContext()
  const { search, setSearch } = useSearchContext<HandicapListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    setPage(1)
    await setSearch({
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
      game_code: d.game_code ? d.game_code : undefined,
      game_status: d.game_status,
      half_game_status: d.half_game_status,
      accounting_status: d.accounting_status,
      half_accounting_status: d.half_accounting_status,
      sorts: d.sort ? [d.sort] : undefined,
    })
    setIsSearchReady(true)
  }

  // 默认搜寻
  useEffect(() => {
    onSearch()
  }, [])

  useEffect(() => {
    isSearchReady && fetchList(search)
  }, [search, isSearchReady])

  return (
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField name="game_code" label="球种" initialValue={0}>
          <Select options={[{ label: '全部', value: 0 }, ...gameOpts]} />
        </InlineFormField>

        <InlineFormField
          name="date_range"
          label="日期"
          w={['auto', 'auto']}
          initialValue={dateRanges[DateRangeType.Today]}
        >
          <DatePicker.RangePicker allowClear />
        </InlineFormField>
        <InlineFormField name="date_range">
          <DateRangeBtns />
        </InlineFormField>
        <InlineFormField
          name="game_status"
          label="全场赛事状态"
          initialValue={0}
        >
          <Select options={[{ label: '全部', value: 0 }, ...gameStatusOpts]} />
        </InlineFormField>
        <InlineFormField
          name="half_game_status"
          label="半场赛事状态"
          initialValue={0}
        >
          <Select options={[{ label: '全部', value: 0 }, ...gameStatusOpts]} />
        </InlineFormField>
        <InlineFormField
          name="accounting_status"
          label="全场结帐"
          initialValue={0}
        >
          <Select
            options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
          />
        </InlineFormField>
        <InlineFormField
          name="half_accounting_status"
          label="半场结帐"
          initialValue={0}
        >
          <Select
            options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
          />
        </InlineFormField>
        <InlineFormField name="sort" label="排序" initialValue="play_at asc">
          <Select options={sortByOpts} />
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
