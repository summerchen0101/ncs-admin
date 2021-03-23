import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { playOpts, sectionOpts } from '@/lib/options'
import { OddsListRequest } from '@/types/api/Odds'
import useOddsService from '@/utils/services/useOddsService'
import { Spacer } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import SearchBarContent from '../SearchBarContent'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  game_code: string
  play_code: string
  section_code: string
  handicap_id: number
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const { fetchList } = useOddsService()
  const [gameOpts] = useOptionsContext().game
  const { search, setSearch } = useSearchContext<OddsListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const router = useRouter()
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      game_code: d.game_code,
      play_code: d.play_code,
      section_code: d.section_code,
      handicap_id: +d.handicap_id,
    })
  }
  useEffect(() => {
    if (search?.game_code && search?.play_code && search?.section_code) {
      fetchList(search)
    }
  }, [search])

  useEffect(() => {
    if (router.query?.event) {
      form.setFieldsValue({
        game_code: router.query.game as string,
        play_code: router.query.play as string,
        section_code: router.query.section as string,
        handicap_id: +router.query.event,
      })
      onSearch()
    }
  }, [router])
  return (
    <SearchBar isOpen={visible} form={form}>
      <SearchBarContent>
        <InlineFormField
          name="game_code"
          label="球种"
          rules={[{ required: true }]}
        >
          <Select options={gameOpts} placeholder="请选择" />
        </InlineFormField>
        <InlineFormField
          name="section_code"
          label="场次"
          rules={[{ required: true }]}
        >
          <Select options={sectionOpts} placeholder="请选择" />
        </InlineFormField>
        <InlineFormField
          name="play_code"
          label="玩法"
          rules={[{ required: true }]}
        >
          <Select options={playOpts} placeholder="请选择" />
        </InlineFormField>
        <InlineFormField name="handicap_id" label="赛事编号">
          <Input allowClear />
        </InlineFormField>
      </SearchBarContent>

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
