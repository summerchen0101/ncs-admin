import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { Button, Input, Select, Spacer, useDisclosure } from '@chakra-ui/react'
import React from 'react'

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  return (
    <SearchBar isOpen={visible}>
      <InlineFormField label="帳號" code="acc" w={{ md: '180px' }}>
        <Input />
      </InlineFormField>
      <InlineFormField label="角色" code="role" w={{ md: '180px' }}>
        <Select placeholder="請選擇">
          <option>系統管理員</option>
          <option>客服</option>
        </Select>
      </InlineFormField>
    </SearchBar>
  )
}

export default PageSearchBar