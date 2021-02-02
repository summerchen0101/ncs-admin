import { Box } from '@chakra-ui/react'
import React from 'react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

type BasicTableProps<T> = {
  columns: ColumnsType<T>
  data: T[]
}

const BasicTable = function <T extends { id: number }>({
  columns,
  data,
}: BasicTableProps<T>) {
  return (
    <Box maxW="100%" overflowX="auto" bg="white" shadow="sm">
      <Box
        as={Table}
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={false}
        whiteSpace="nowrap"
      />
    </Box>
  )
}

export default BasicTable
