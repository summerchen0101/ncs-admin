import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { AccountingStatus, GameStatus } from '@/lib/enums'
import { accountingStatusOpts, gameStatusOpts } from '@/lib/options'
import { HandicapListRequest } from '@/types/api/Handicap'
import useHandicapService from '@/utils/services/useHandicapService'
import useOptionsService from '@/utils/services/useOptionsService'
import { Spacer, Stack } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  game_code: string
  game_status: GameStatus
  date_range: [Moment, Moment]
  accounting_status: AccountingStatus
  half_accounting_status: AccountingStatus
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
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
      game_code: d.game_code ? d.game_code : undefined,
      game_status: d.game_status,
      accounting_status: d.accounting_status,
      half_accounting_status: d.half_accounting_status,
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <Stack w={['auto', '90%']} spacing="3">
        <Stack direction={['column', 'row']} w={['full', 'auto']}>
          <InlineFormField name="game_code" label="球種" initialValue={0}>
            <Select options={[{ label: '全部', value: 0 }, ...gameOpts]} />
          </InlineFormField>
          <InlineFormField name="game_status" label="賽事狀態" initialValue={0}>
            <Select
              options={[{ label: '全部', value: 0 }, ...gameStatusOpts]}
            />
          </InlineFormField>

          <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
            <DatePicker.RangePicker allowClear />
          </InlineFormField>
        </Stack>
        <Stack direction={['column', 'row']} w={['full', 'auto']}>
          <InlineFormField
            name="accounting_status"
            label="全場結帳狀態"
            initialValue={0}
          >
            <Select
              options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
            />
          </InlineFormField>
          <InlineFormField
            name="half_accounting_status"
            label="半場結帳狀態"
            initialValue={0}
          >
            <Select
              options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
            />
          </InlineFormField>
        </Stack>
      </Stack>

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
