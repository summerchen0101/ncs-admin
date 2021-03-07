import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { IPBlockType } from '@/lib/enums'
import { IPBlockTypeOpts } from '@/lib/options'
import { IpBlockListRequest } from '@/types/api/IpBlock'
import useIpBlockService from '@/utils/services/useIpBlockService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  block_type: IPBlockType
  ip: string
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useIpBlockService()
  const { search, setSearch } = useSearchContext<IpBlockListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      block_type: d.block_type,
      ip: d.ip,
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="block_type" label="類型" initialValue={0}>
        <Select options={[{ label: '全部', value: 0 }, ...IPBlockTypeOpts]} />
      </InlineFormField>
      <InlineFormField name="ip" label="IP">
        <Input allowClear />
      </InlineFormField>

      <Spacer />
      <TipIconButton
        label="search"
        icon={<HiSearch />}
        onClick={() => onSearch()}
        w={['100%', 'auto']}
        colorScheme="orange"
      />
    </SearchBar>
  )
}

export default PageSearchBar
