import Breadcrumb from '@/components/Breadcrumb'
import Dashboard from '@/components/Dashboard'
import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useMemo } from 'react'

const UserPage: React.FC = () => {
  return (
    <Dashboard>
      <Breadcrumb
        category="管理員管理"
        current={{ name: '管理員列表', path: '/user' }}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>編號</Th>
            <Th>帳號</Th>
            <Th>暱稱</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>xxx</Td>
          </Tr>
        </Tbody>
      </Table>
    </Dashboard>
  )
}

export default UserPage
