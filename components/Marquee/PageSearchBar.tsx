import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { newsTypeOpts } from '@/lib/options'
import useMarqueeService from '@/utils/services/useMarqueeService'
import { IconButton, Input, Select } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineSearch } from 'react-icons/hi'
import BasicSelect from '../BasicSelect'

type SearchFormType = {
  content: string
  start_at: string
  end_at: string
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useMarqueeService()
  const { register, handleSubmit } = useForm<SearchFormType>()
  const onSearch = handleSubmit((d) =>
    fetchList({
      content: d.content,
      start_at: moment(d.start_at).startOf('d').unix(),
      end_at: moment(d.end_at).endOf('d').unix(),
    }),
  )
  return (
    <SearchBar isOpen={visible}>
      <InlineFormField label="起始日期" code="start_at" w={{ md: '230px' }}>
        <Input name="start_at" ref={register} placeholder="ex: 2020-01-02" />
      </InlineFormField>
      <InlineFormField label="結束日期" code="end_at" w={{ md: '230px' }}>
        <Input name="end_at" ref={register} placeholder="ex: 2020-01-30" />
      </InlineFormField>
      <InlineFormField label="內容" code="content" w={{ md: '180px' }}>
        <Input name="content" ref={register} />
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
