import BasicTable, { ColumnType } from '@/components/BasicTable'
import Dashboard from '@/components/Dashboard'
import FormField from '@/components/FormField'
import InlineFormField from '@/components/InlineFormField'
import Breadcrumb from '@/components/MyBreadcrumb'
import SearchBar from '@/components/SearchBar'
import SearchButton from '@/components/SearchButton'
import TipIconButton from '@/components/TipIconButton'
import { BlockStatus } from '@/lib/enums'
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
import moment from 'moment'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { useMemo } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'

interface Role {
  id: number
  name: string
}
interface User {
  id: number
  acc: string
  // pass: string
  name: string
  roles: Role[]
  // permissions: Permission[]
  is_active: boolean
  status: BlockStatus

  login_ip: string
  logined_at: number
  created_at: number
  updated_at: number
}

export const getStaticProps: GetStaticProps<{ data: User[] }> = async (
  context,
) => {
  const data: User[] = await Promise.resolve([
    {
      id: 1,
      acc: 'summer',
      roles: [
        { name: '管理員', id: 1 },
        { name: '客服', id: 2 },
      ],
      name: '夏天',
      is_active: true,
      status: 1,
      login_ip: '127.2.3.4',
      logined_at: moment().unix(),
      created_at: moment().unix(),
      updated_at: moment().unix(),
    },
  ])
  return {
    props: { data },
  }
}

const UserPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
  const { toDateTime } = useTransfer()
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })
  const columns: ColumnType<User>[] = useMemo(
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
        render: () => <Switch colorScheme="red" defaultChecked />,
      },
      {
        title: '狀態',
        render: () => <Switch colorScheme="green" defaultChecked />,
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

      <BasicTable columns={columns} data={data} />
    </Dashboard>
  )
}

export default UserPage
