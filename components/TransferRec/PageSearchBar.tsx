import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { DateRangeType, WalletRecType } from '@/lib/enums'
import { walletRecTypeOpts } from '@/lib/options'
import { TransferRecListRequest } from '@/types/api/TransferRec'
import { WalletRecListRequest } from '@/types/api/WalletRec'
import useTransferRecService from '@/utils/services/useTransferRecService'
import useWalletRecService from '@/utils/services/useWalletRecService'
import useTransfer from '@/utils/useTransfer'
import { Flex, Spacer, Stack, VStack } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import DateRangeBtns from '../DateRangeBtns'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  from_acc: string
  to_acc: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const [isSearchReady, setIsSearchReady] = useState(false)
  const { fetchList } = useTransferRecService()
  const { search, setSearch } = useSearchContext<TransferRecListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const { dateRanges } = useTransfer()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      to_acc: d.to_acc,
      from_acc: d.from_acc,
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
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
          <DatePicker.RangePicker allowClear />
        </InlineFormField>
        <InlineFormField name="date_range">
          <DateRangeBtns />
        </InlineFormField>
        <InlineFormField name="from_acc" label="轉出帳號">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField name="to_acc" label="轉入帳號">
          <Input allowClear />
        </InlineFormField>
      </SearchBarContent>

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
