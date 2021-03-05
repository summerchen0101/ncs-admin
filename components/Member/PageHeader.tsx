import Breadcrumb from '@/components/MyBreadcrumb'
import SearchButton from '@/components/SearchButton'
import { useDataContext } from '@/context/DataContext'
import { useGlobalContext } from '@/context/GlobalContext'
import { usePopupContext } from '@/context/PopupContext'
import { MemberType } from '@/lib/enums'
import menu from '@/lib/menu'
import { Member } from '@/types/api/Member'
import useMemberService from '@/utils/services/useMemberService'
import { Flex, Spacer, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import CreateButton from '../CreateButton'

function PageHeader() {
  const [searchBarBisible, setSearchBarVisible] = usePopupContext('searchBar')
  const [, setCreateVisible] = usePopupContext('createForm')
  const { setBetSettingMemberType } = useDataContext()
  const { user } = useGlobalContext()
  const { fetchParentBetSetting, fetchById } = useMemberService()
  const router = useRouter()

  const handleCreate = async () => {
    const id = +router.query?.pid || user?.id
    setBetSettingMemberType(MemberType.Agent)
    await fetchParentBetSetting(id)
    setCreateVisible(true)
  }
  return (
    <Stack direction={['row']} alignItems="center" mb="15px">
      <Breadcrumb
        category={menu.member.name}
        current={menu.member.pages.member}
      />
      <Spacer />
      <Stack direction="row">
        <SearchButton
          onClick={() => setSearchBarVisible((v) => !v)}
          isOpen={searchBarBisible}
        />
        {!router.query?.pid && <CreateButton onClick={handleCreate} />}
      </Stack>
    </Stack>
  )
}

export default PageHeader
