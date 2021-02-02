import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { newsTypeOpts } from '@/lib/options'
import useNewsService from '@/utils/services/useNewsService'
import { IconButton, Input, Select } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineSearch } from 'react-icons/hi'
import BasicSelect from '../BasicSelect'

type SearchFormType = {
  title: string
  news_type: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useNewsService()
  const { register, handleSubmit } = useForm<SearchFormType>()
  const onSearch = handleSubmit((d) =>
    fetchList({
      title: d.title,
      news_type: +d.news_type,
    }),
  )
  return (
    <SearchBar isOpen={visible}>
      <InlineFormField label="標題" code="title" w={{ md: '180px' }}>
        <Input name="title" ref={register} />
      </InlineFormField>
      <InlineFormField label="類型" code="news_type" w={{ md: '180px' }}>
        <Select
          as={BasicSelect}
          ref={register}
          name="news_type"
          options={[{ label: '全部', value: 0 }, ...newsTypeOpts]}
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
