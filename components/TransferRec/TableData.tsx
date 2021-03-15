import BasicTable from '@/components/BasicTable'
import { ProcessStatus } from '@/lib/enums'
import { processStatusOpts, walletRecTypeOpts } from '@/lib/options'
import { TransferRec } from '@/types/api/TransferRec'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import ColorText from '../ColorText'

function TableData({ list }: { list: TransferRec[] }) {
  const { toDateTime, toOptionName, toCurrency } = useTransfer()
  const columns: ColumnsType<TransferRec> = useMemo(
    () => [
      {
        title: '转出帐号',
        render: (_, row) => `${row.from_member.acc}[${row.from_member.name}]`,
      },
      {
        title: '转移金额',
        render: (_, row) => (
          <Text color="blue.500" fontWeight="bold">
            ${toCurrency(row.amount)}
          </Text>
        ),
      },
      {
        title: '转出后余额',
        render: (_, row) => `$${toCurrency(row.from_balance)}`,
      },

      {
        title: '转入帐号',
        render: (_, row) => `${row.to_member.acc}[${row.to_member.name}]`,
      },
      {
        title: '状态',
        render: (_, row) => {
          const colorMap = {
            [ProcessStatus.Finish]: 'green',
            [ProcessStatus.Cancel]: 'red',
          }
          return (
            <Tag
              colorScheme={colorMap[row.status]}
              variant="solid"
              borderRadius="sm"
            >
              {toOptionName(processStatusOpts, row.status)}
            </Tag>
          )
        },
      },
      { title: '转移时间', render: (_, row) => toDateTime(row.created_at) },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
