import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { DateRangeType, WalletRecType } from '@/lib/enums'
import { walletRecTypeOpts } from '@/lib/options'
import { WalletRecListRequest } from '@/types/api/WalletRec'
import useWalletRecService from '@/utils/services/useWalletRecService'
import useTransfer from '@/utils/useTransfer'
import { Flex, Spacer, Stack, VStack } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import DateRangeBtns from '../DateRangeBtns'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  wallet_rec_type: WalletRecType
  acc: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const [isSearchReady, setIsSearchReady] = useState(false)
  const { fetchList } = useWalletRecService()
  const { search, setSearch } = useSearchContext<WalletRecListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const { dateRanges } = useTransfer()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      acc: d.acc,
      wallet_rec_type: d.wallet_rec_type,
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
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
      <Stack direction={['column', 'row']} w="full" overflowX="auto">
        <InlineFormField name="wallet_rec_type" label="類型" initialValue={0}>
          <Select
            options={[{ label: '全部', value: 0 }, ...walletRecTypeOpts]}
          />
        </InlineFormField>
        <InlineFormField name="acc" label="帳號">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
          <DatePicker.RangePicker allowClear />
        </InlineFormField>
        <InlineFormField name="date_range" w={['auto', '300px']}>
          <DateRangeBtns />
        </InlineFormField>
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
