import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { AccountingStatus, ProcessStatus } from '@/lib/enums'
import { accountingStatusOpts } from '@/lib/options'
import { BetRecordListRequest } from '@/types/api/BetRecord'
import useBetRecordService from '@/utils/services/useBetRecordService'
import { Box, Flex, HStack, Spacer, Stack, VStack } from '@chakra-ui/react'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect, useMemo } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import menu from '@/lib/menu'
import DateRangeBtns from '../DateRangeBtns'

type SearchFormType = {
  acc: string
  accounting_status: AccountingStatus
  date_range: [Moment, Moment]
  sns: string
  handicap_id: string
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useBetRecordService()
  const { search, setSearch } = useSearchContext<BetRecordListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const router = useRouter()
  const initRouterQuery = useMemo(
    () => ({
      handicap_id: +router.query?.hid || 0,
    }),
    [router.query],
  )
  const onSearch = async () => {
    const d = await form.validateFields()
    const sns = d.sns
      ? _(d.sns.split(',').map((t) => t.trim()))
          .uniq()
          .compact()
          .value()
      : undefined
    router.replace({
      pathname: menu.event.pages.betRecord.path,
      query: {
        hid: d.handicap_id || undefined,
      },
    })
    await setSearch({
      acc: d.acc,
      handicap_id: +d.handicap_id,
      accounting_status: d.accounting_status,
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
      sns,
    })
  }
  useEffect(() => {
    fetchList({ ...search, ...initRouterQuery })
  }, [search, initRouterQuery])

  useEffect(() => {
    if (router.query?.hid) {
      form.setFieldsValue({ handicap_id: router.query?.hid as string })
    }
  }, [router.query])
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
          <InlineFormField name="date_range">
            <DateRangeBtns />
          </InlineFormField>
          <InlineFormField
            name="accounting_status"
            label="結帳狀態"
            initialValue={0}
          >
            <Select
              options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
            />
          </InlineFormField>
        </Stack>
        <Stack direction={['column', 'row']} w={['full', 'auto']}>
          <InlineFormField name="handicap_id" label="賽事編號">
            <Input allowClear />
          </InlineFormField>
          <InlineFormField
            name="sns"
            label="注单编号"
            help="＊多笔可用「,」隔开 "
            w={['full', '600px']}
          >
            <Input allowClear placeholder="ex: ab12342,fa2131" />
          </InlineFormField>
        </Stack>
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
