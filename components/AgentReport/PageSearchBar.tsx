import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberType, ProcessStatus } from '@/lib/enums'
import { accountingStatusOpts, gameOpts, memberTypeOpts } from '@/lib/options'
import { GameReportListRequest } from '@/types/api/GameReport'
import useGameReportService from '@/utils/services/useGameReportService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select, Checkbox } from 'antd'
import { Moment } from 'moment'
import React, { useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  content: string
  date_range: [Moment, Moment]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useGameReportService()
  const { search, setSearch } = useSearchContext<GameReportListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({})
  }
  useEffect(() => {
    // fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      {/* <InlineFormField
        name="date_range"
        label="月份區間"
        w={['auto', 'auto']}
        initialValue={1}
      >
        <Select
          options={[
            { label: '前3個月', value: 1 },
            { label: '前6個月', value: 2 },
          ]}
        />
      </InlineFormField> */}
      <InlineFormField
        name="game_code"
        label="球種"
        initialValue={gameOpts.map((t) => t.value)}
        w={['auto', '400px']}
      >
        <Checkbox.Group options={gameOpts} />
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
