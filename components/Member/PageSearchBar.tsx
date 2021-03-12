import InlineFormField from '@/components/InlineFormField'
import SearchBar from '@/components/SearchBar'
import { useOptionsContext } from '@/context/OptionsContext'
import { usePopupContext } from '@/context/PopupContext'
import { useSearchContext } from '@/context/SearchContext'
import { MemberType, Status } from '@/lib/enums'
import { memberTypeOpts, statusOpts } from '@/lib/options'
import { MemberListRequest } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import { Spacer, Stack, VStack } from '@chakra-ui/react'
import { DatePicker, Form, Input, Select } from 'antd'
import { Moment } from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo } from 'react'
import { HiSearch } from 'react-icons/hi'
import ColorTagSelector from '../ColorTagSelector'
import TipIconButton from '../TipIconButton'

type SearchFormType = {
  acc: string
  member_type: MemberType
  is_active: Status
  date_range: [Moment, Moment]
  tag_ids: number[]
}

function PageSearchBar() {
  const [visible] = usePopupContext('searchBar')
  const [tagOpts] = useOptionsContext().tag
  const { fetchList } = useMemberService()
  const { search, setSearch } = useSearchContext<MemberListRequest>()
  const [form] = Form.useForm<SearchFormType>()
  const router = useRouter()
  const initRouterQuery = useMemo(
    () => ({
      member_type: +router.query?.type || MemberType.Agent,
      agent_id: +router.query?.pid || 0,
    }),
    [router.query],
  )
  const onSearch = async () => {
    const d = await form.validateFields()
    await setSearch({
      start_at: d.date_range?.[0].startOf('day').unix(),
      end_at: d.date_range?.[1].endOf('day').unix(),
      member_type: d.member_type,
      acc: d.acc,
      is_active: d.is_active,
      tag_ids: d.tag_ids,
    })
  }

  useEffect(() => {
    setSearch(initRouterQuery)
  }, [router])

  useEffect(() => {
    fetchList(search)
  }, [search])
  return (
    <SearchBar isOpen={visible} form={form} layout="inline">
      <VStack
        w={['auto', '90%']}
        alignItems="start"
        spacing="3"
        // overflowX="auto"
      >
        <Stack direction={['column', 'row']} w={['full', 'auto']}>
          <InlineFormField
            name="member_type"
            label="類型"
            initialValue={initRouterQuery.member_type}
          >
            <Select options={memberTypeOpts} />
          </InlineFormField>
          <InlineFormField name="acc" label="帳號">
            <Input allowClear />
          </InlineFormField>
          <InlineFormField name="is_active" label="狀態" initialValue={0}>
            <Select options={[{ label: '全部', value: 0 }, ...statusOpts]} />
          </InlineFormField>
        </Stack>
        <Stack direction={['column', 'row']} w={['full', 'auto']}>
          <InlineFormField
            name="date_range"
            label="註冊日期"
            w={['auto', 'auto']}
          >
            <DatePicker.RangePicker allowClear />
          </InlineFormField>
          {tagOpts.length > 0 && (
            <InlineFormField name="tag_ids" label="標籤" w="auto" minW="220px">
              <ColorTagSelector options={tagOpts} />
            </InlineFormField>
          )}

          {/* <InlineFormField name="date_range" w={['auto', '300px']}>
            <DateRangeBtns />
          </InlineFormField> */}
        </Stack>
      </VStack>

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
