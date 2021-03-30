import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { Status } from '@/lib/enums'
import { BannerListRequest } from '@/types/api/Banner'
import useBannerService from '@/utils/services/useBannerService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  title: string
  date_range: [Moment, Moment]
  is_active: Status
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useBannerService()
  const { search, setSearch } = useSearchContext<BannerListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    setSearch({
      title: d.title,
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
      is_active: d.is_active,
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <InlineFormField name="date_range" label="日期" w={['auto', 'auto']}>
        <DatePicker.RangePicker allowClear />
      </InlineFormField>
      <InlineFormField name="title" label="内容">
        <Input allowClear />
      </InlineFormField>

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
