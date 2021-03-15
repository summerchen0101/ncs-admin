import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { AccountingType, ProcessStatus, SportGame } from '@/lib/enums'
import { accountingStatusOpts, gameOpts } from '@/lib/options'
import { MarqueeListRequest } from '@/types/api/Marquee'
import useMarqueeService from '@/utils/services/useMarqueeService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  content: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useMarqueeService()
  const { search, setSearch } = useSearchContext<MarqueeListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      content: d.content,
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <InlineFormField label="球种">
        <Select defaultValue={SportGame.Soccor} options={gameOpts} />
      </InlineFormField>
      <InlineFormField name="date_range" label="开赛日期" w={['auto']}>
        <DatePicker.RangePicker allowClear />
      </InlineFormField>
      <InlineFormField label="结帐状态">
        <Select
          defaultValue={ProcessStatus.Pending}
          options={[{ label: '全部', value: 0 }, ...accountingStatusOpts]}
        />
      </InlineFormField>

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
