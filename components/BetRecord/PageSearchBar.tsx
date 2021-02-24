import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { ProcessStatus } from '@/lib/enums'
import { accountingStatusOpts } from '@/lib/options'
import { BetRecordListRequest } from '@/types/api/BetRecord'
import useBetRecordService from '@/utils/services/useBetRecordService'
import { Box, Flex, Spacer, Stack, VStack } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  accounting_status: ProcessStatus
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useBetRecordService()
  const { search, setSearch } = useSearchContext<BetRecordListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      acc: d.acc,
      accounting_status: d.accounting_status,
      start_at: d.date_range?.[0].unix(),
      end_at: d.date_range?.[1].unix(),
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <VStack w={['auto', '90%']} alignItems="start" spacing="3">
        <Stack direction={['column', 'row']} w={['full', 'auto']}>
          <InlineFormField name="acc" label="帳號">
            <Input allowClear />
          </InlineFormField>
          <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
            <DatePicker.RangePicker allowClear />
          </InlineFormField>
          <InlineFormField
            name="accounting_status"
            label="結帳狀態"
            initialValue={0}
          >
            <Select
              options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
              onChange={onSearch}
            />
          </InlineFormField>
        </Stack>
        <InlineFormField
          name="content"
          label="注单编号"
          help="＊多笔可用「,」隔开 "
          w={['full', '600px']}
        >
          <Input.TextArea
            allowClear
            placeholder="ex: ab12342,fa2131"
            rows={2}
          />
        </InlineFormField>
      </VStack>
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
