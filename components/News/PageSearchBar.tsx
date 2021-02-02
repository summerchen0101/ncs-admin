import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import useNewsService from '@/utils/services/useNewsService'
import { IconButton, Input, Select } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineSearch } from 'react-icons/hi'
import BasicSelect from '../BasicSelect'

type SearchFormType = {
  acc: string
  role_id: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const [roleOptions] = useOptionsContext('roles')
  const { fetchList } = useNewsService()
  const { register, handleSubmit } = useForm<SearchFormType>()
  const onSearch = handleSubmit((d) => fetchList())
  return (
    <SearchBar isOpen={visible}>
      <InlineFormField label="帳號" code="acc" w={{ md: '180px' }}>
        <Input name="acc" ref={register} />
      </InlineFormField>
      <InlineFormField label="類型" code="role_id" w={{ md: '180px' }}>
        <Select
          as={BasicSelect}
          ref={register}
          name="role_id"
          options={roleOptions}
          placeholder="請選擇"
        />
      </InlineFormField>
      <IconButton
        icon={<HiOutlineSearch />}
        aria-label="search"
        onClick={() => onSearch()}
      />
    </SearchBar>
  )
}

export default PageSearchBar
