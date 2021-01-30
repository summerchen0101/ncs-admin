import BasicTable, { ColumnType } from '@/components/BasicTable'
import Breadcrumb from '@/components/Breadcrumb'
import Dashboard from '@/components/Dashboard'
import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useMemo } from 'react'

interface User {
  id: number
  acc: string
  name: string
}

const UserPage: React.FC = () => {
  const columns: ColumnType<User>[] = useMemo(
    () => [
      { title: '編號', code: 'id', render: (value, row) => value },
      { title: '帳號', code: 'acc', render: (value, row) => value },
      { title: '暱稱', code: 'name', render: (value, row) => value },
    ],
    [],
  )

  const data: User[] = useMemo(
    () => [
      { id: 1, acc: 'summer', name: '夏天' },
      { id: 2, acc: 'ruby', name: '小紅' },
    ],
    [],
  )
  return (
    <Dashboard>
      <Breadcrumb
        category="管理員管理"
        current={{ name: '管理員列表', path: '/user' }}
      />
      <BasicTable columns={columns} data={data} />
    </Dashboard>
  )
}

export default UserPage
