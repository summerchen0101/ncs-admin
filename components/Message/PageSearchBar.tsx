import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { memberTypeOpts, newsTypeOpts } from '@/lib/options'
import useMessageService from '@/utils/services/useMessageService'
import { Box, Spacer } from '@chakra-ui/react'
import { Form, Input, Select } from 'antd'
import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  title: string
  member_type: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useMessageService()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await fetchList({
      title: d.title,
      member_type: +d.member_type,
    })
  }
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <InlineFormField name="title" label="標題">
        <Input allowClear />
      </InlineFormField>
      <InlineFormField name="member_type" label="類型" initialValue={0}>
        <Box
          as={Select}
          options={[{ label: '全部', value: 0 }, ...memberTypeOpts]}
        />
      </InlineFormField>

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
