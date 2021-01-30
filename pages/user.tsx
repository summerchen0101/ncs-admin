import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useMemo } from 'react'

const UserPage = () => {
  return (
    <Box>
      <Text fontSize="1.5em" color="gray.400" mb={1}>
        管理員管理
      </Text>
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
    </Box>
  )
}

export default UserPage
