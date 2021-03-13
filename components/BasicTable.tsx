import { Box } from '@chakra-ui/react'
import { Table } from 'antd'
import { ColumnsType, TableProps } from 'antd/lib/table'
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
  ...props
}: BasicTableProps<T> & TableProps<T>) {
  return (
    <Box
      maxW="100%"
      overflowX="auto"
      bg="white"
      shadow="sm"
      borderRadius="4px"
      whiteSpace="nowrap"
    >
      <Table
        rowKey={rowKey}
        columns={columns}
        dataSource={data}
        pagination={false}
        summary={summary}
        {...props}
      />
    </Box>
  )
}

export default BasicTable
