import BasicTable, { ColumnType } from '@/components/BasicTable'
import Dashboard from '@/components/Dashboard'
import InlineFormField from '@/components/InlineFormField'
import Breadcrumb from '@/components/MyBreadcrumb'
import SearchBar from '@/components/SearchBar'
import SearchButton from '@/components/SearchButton'
import TipIconButton from '@/components/TipIconButton'
import { useDataContext } from '@/context/DataContext'
import { BlockStatus } from '@/lib/enums'
import { AdminUser } from '@/types/api/user'
import useAdminUserService from '@/utils/services/useAdminUserService'
import useTransfer from '@/utils/useTransfer'
import {
  Flex,
  HStack,
  Input,
  Select,
  Spacer,
  Switch,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'

const UserPage: React.FC = () => {
  const { toDateTime } = useTransfer()
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })
  const { fetchUserList, setStatus, setActive } = useAdminUserService()
  const { list } = useDataContext<AdminUser>()

  useEffect(() => {
    fetchUserList()
  }, [])

  const columns: ColumnType<AdminUser>[] = useMemo(
    () => [
      { title: '帳號', code: 'acc' },
      { title: '暱稱', code: 'name' },
      {
        title: '角色',
        render: (_, row) => row.roles.map((t) => t.name).join(','),
      },
      { title: '上次登入時間', render: (_, row) => toDateTime(row.logined_at) },
      { title: '上次登入IP', code: 'login_ip' },
      {
        title: '鎖定',
        render: (_, row) => (
          <Switch
            colorScheme="red"
            isChecked={row.status === 2}
            onChange={(e) =>
              setStatus(
                row.id,
                e.target.checked ? BlockStatus.Blocked : BlockStatus.Normal,
              )
            }
          />
        ),
      },
      {
        title: '啟用',
        render: (_, row) => (
          <Switch
            colorScheme="green"
            isChecked={row.is_active}
            onChange={(e) => setActive(row.id, e.target.checked)}
          />
        ),
      },
      {
        title: '密碼',
        render: () => (
          <TipIconButton label="密碼修改" icon={<HiOutlinePencilAlt />} />
        ),
      },
      {
        title: '操作',
        render: () => (
          <HStack my="-4">
            <TipIconButton label="編輯" icon={<HiOutlinePencilAlt />} />
            <TipIconButton
              label="刪除"
              icon={<HiOutlineTrash />}
              colorScheme="red"
            />
          </HStack>
        ),
      },
    ],
    [],
  )

  return (
    <Dashboard>
      <Flex alignItems="center" mb="10px">
        <Breadcrumb
          category="管理員管理"
          current={{ name: '管理員列表', path: '/user' }}
        />
        <Spacer />
        <SearchButton onToggle={onToggle} />
      </Flex>

      <SearchBar isOpen={isOpen}>
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

      <BasicTable columns={columns} data={list} />
    </Dashboard>
  )
}

export default UserPage
