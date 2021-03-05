import { Box } from '@chakra-ui/react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { useEffect } from 'react'

type BasicTableProps<T> = {
  columns: ColumnsType<T>
  data: T[]
  summary?: (data: readonly object[]) => React.ReactNode
  rowKey?: string
}

const BasicTable = function <T extends {}>({
  columns,
  data,
  summary,
  rowKey = 'id',
}: BasicTableProps<T>) {
  return (
    <Box maxW="100%" overflowX="auto" bg="white" shadow="sm">
      <Box
        as={Table}
        rowKey={rowKey}
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
