import { Box } from '@chakra-ui/react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'

type BasicTableProps<T> = {
  columns: ColumnsType<T>
  data: T[]
  summary?: (data: readonly object[]) => React.ReactNode
}

const BasicTable = function <T extends { id: number }>({
  columns,
  data,
  summary,
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
        summary={summary}
      />
    </Box>
  )
}

export default BasicTable
