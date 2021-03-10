import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
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
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  game_code: string
  game_status: GameStatus
  date_range: [Moment, Moment]
  accounting_status: AccountingStatus
  half_accounting_status: AccountingStatus
}

const sortByOpts: OptionType[] = [
  { label: '預設', value: 0 },
  // { label: '開賽時間', value: 'play_at' },
  { label: '注單量', value: 'count' },
  { label: '累計注額', value: 'amount' },
]

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const [isSearchReady, setIsSearchReady] = useState(false)
  const router = useRouter()
  const { dateRanges } = useTransfer()
  const { fetchList } = useHandicapService()
  const { search, setSearch } = useSearchContext<HandicapListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
      game_code: d.game_code ? d.game_code : undefined,
      game_status: d.game_status,
      accounting_status: d.accounting_status,
      half_accounting_status: d.half_accounting_status,
    })
  }

  // 預設搜尋
  useEffect(() => {
    form.setFieldsValue({ date_range: dateRanges[DateRangeType.Today] })
    setSearch((s) => ({
      start_at: dateRanges[DateRangeType.Today][0].unix(),
      end_at: dateRanges[DateRangeType.Today][1].unix(),
    }))
    setIsSearchReady(true)
  }, [])

  useEffect(() => {
    isSearchReady && fetchList(search)
  }, [search, isSearchReady])

  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <Stack w={['auto', '90%']} spacing="3">
        <Stack direction={['column', 'row']} w={['full', 'auto']}>
          <InlineFormField name="game_code" label="球種" initialValue={0}>
            <Select options={[{ label: '全部', value: 0 }, ...gameOpts]} />
          </InlineFormField>

          <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
            <DatePicker.RangePicker allowClear />
          </InlineFormField>
          <InlineFormField name="date_range" w={['auto', '300px']}>
            <DateRangeBtns />
          </InlineFormField>
        </Stack>
        <Stack direction={['column', 'row']} w={['full', 'auto']}>
          <InlineFormField name="game_status" label="賽事狀態" initialValue={0}>
            <Select
              options={[{ label: '全部', value: 0 }, ...gameStatusOpts]}
            />
          </InlineFormField>
          <InlineFormField
            name="accounting_status"
            label="全場結帳"
            initialValue={0}
          >
            <Select
              options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
            />
          </InlineFormField>
          <InlineFormField
            name="half_accounting_status"
            label="半場結帳"
            initialValue={0}
          >
            <Select
              options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
            />
          </InlineFormField>
          <InlineFormField name="sort" label="排序" initialValue={0}>
            <Select options={sortByOpts} />
          </InlineFormField>
        </Stack>
      </Stack>

      <Spacer />
      <TipIconButton
        label="search"
        icon={<HiSearch />}
        onClick={() => onSearch()}
        w={['100%', 'auto']}
        colorScheme="brand"
      />
    </SearchBar>
  )
}

export default PageSearchBar
