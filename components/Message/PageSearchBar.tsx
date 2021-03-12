import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { memberTypeOpts, newsTypeOpts } from '@/lib/options'
import { MessageListRequest } from '@/types/api/Message'
import useMessageService from '@/utils/services/useMessageService'
import { Box, Spacer } from '@chakra-ui/react'
import { Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  title: string
  member_type: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useMessageService()
  const { search, setSearch } = useSearchContext<MessageListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      title: d.title,
      member_type: +d.member_type,
    })
  }
  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form}>
      <InlineFormField name="title" label="標題">
        <Input allowClear />
      </InlineFormField>
      <InlineFormField name="member_type" label="收信人身份" initialValue={0}>
        <Box
          as={Select}
          options={[{ label: '全部', value: 0 }, ...memberTypeOpts]}
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
