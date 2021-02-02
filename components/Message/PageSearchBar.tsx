import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { memberTypeOpts, newsTypeOpts } from '@/lib/options'
import useMessageService from '@/utils/services/useMessageService'
import { IconButton, Input, Select } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineSearch } from 'react-icons/hi'
import BasicSelect from '../BasicSelect'

type SearchFormType = {
  title: string
  member_type: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useMessageService()
  const { register, handleSubmit } = useForm<SearchFormType>()
  const onSearch = handleSubmit((d) =>
    fetchList({
      title: d.title,
      member_type: +d.member_type,
    }),
  )
  return (
    <SearchBar isOpen={visible}>
      <InlineFormField label="標題" code="title" w={{ md: '180px' }}>
        <Input name="title" ref={register} />
      </InlineFormField>
      <InlineFormField label="類型" code="member_type" w={{ md: '180px' }}>
        <Select
          as={BasicSelect}
          ref={register}
          name="member_type"
          options={[{ label: '全部', value: 0 }, ...memberTypeOpts]}
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
