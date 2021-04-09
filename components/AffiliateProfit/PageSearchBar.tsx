import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { ProcessStatus } from '@/lib/enums'
import { processStatusOpts, rewardProcessOpts } from '@/lib/options'
import { AffiliateProfitListRequest } from '@/types/api/AffiliateProfit'
import useAffiliateProfitService from '@/utils/services/useAffiliateProfitService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import SearchBarButtonRadios from '../SearchBarButtonRadios'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  month: Moment
  acc: string
  confirm_status?: ProcessStatus
  pay_status?: ProcessStatus
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useAffiliateProfitService()
  const { search, setSearch } = useSearchContext<AffiliateProfitListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const router = useRouter()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      accounting_date: d.month.format('YYYY-MM'),
      acc: d.acc,
      confirm_status: d.confirm_status,
      pay_status: d.pay_status,
      // start_at: d.date_range?.[0].startOf('day').unix(),
      // end_at: d.date_range?.[1].endOf('day').unix(),
    })
  }
  useEffect(() => {
    fetchList({
      accounting_date: moment().format('YYYY-MM'),
      ...search,
      // parent_id: +router.query?.pid,
    })
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField name="month" label="結算週期" initialValue={moment()}>
          <DatePicker picker="month" placeholder="請選擇週期" />
        </InlineFormField>
        <InlineFormField name="acc" label="會員帳號">
          <Input allowClear />
        </InlineFormField>
        <InlineFormField
          name="confirm_status"
          label="審核状态"
          initialValue={0}
        >
          <Select
            options={[{ label: '全部', value: 0 }, ...processStatusOpts]}
          />
        </InlineFormField>
        <InlineFormField name="pay_status" label="派彩状态" initialValue={0}>
          <Select
            options={[{ label: '全部', value: 0 }, ...rewardProcessOpts]}
          />
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
