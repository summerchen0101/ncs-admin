import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

export interface ColumnType<T> {
  title: string
  code?: string
  render?: (value: string, row: T, index: number) => React.ReactNode
}

type BasicTableProps<T> = {
  columns: ColumnType<T>[]
  data: T[]
}

const BasicTable = function <T>({ columns, data }: BasicTableProps<T>) {
  return (
    <Box maxW="100%" overflowX="auto" bg="white" borderRadius="md" shadow="sm">
      <Table>
        <Thead>
          <Tr>
            {columns.map((t, i) => (
              <Th key={i} fontSize="sm" whiteSpace="nowrap">
                {t.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((d, d_i) => (
            <Tr key={d_i} position="relative">
              {columns.map((c, c_i) => (
                <Td key={c_i} whiteSpace="nowrap">
                  {c.render ? c.render(d[c.code], d, d_i) : d[c.code]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default BasicTable
