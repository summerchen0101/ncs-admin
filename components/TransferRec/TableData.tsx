import BasicTable from '@/components/BasicTable'
import { ProcessStatus } from '@/lib/enums'
import { processStatusOpts, walletRecTypeOpts } from '@/lib/options'
import { TransferRec } from '@/types/api/TransferRec'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import ColorText from '../ColorText'

function TableData({ list }: { list: TransferRec[] }) {
  const { toDateTime, toOptionName, toCurrency } = useTransfer()
  const columns: ColumnsType<TransferRec> = useMemo(
    () => [
      {
        title: '轉出帳號',
        render: (_, row) => `${row.from_member.acc}[${row.from_member.name}]`,
      },
      {
        title: '轉移金額',
        render: (_, row) => <ColorText num={row.amount} />,
      },
      {
        title: '轉出後餘額',
        render: (_, row) => `${toCurrency(row.from_balance)}`,
      },

      {
        title: '轉入帳號',
        render: (_, row) => `${row.to_member.acc}[${row.to_member.name}]`,
      },
      {
        title: '狀態',
        render: (_, row) => {
          const colorMap = {
            [ProcessStatus.Finish]: 'green.500',
            [ProcessStatus.Cancel]: 'red.500',
          }
          return (
            <Text color={colorMap[row.status]}>
              {toOptionName(processStatusOpts, row.status)}
            </Text>
          )
        },
      },
      { title: '轉移時間', render: (_, row) => toDateTime(row.created_at) },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
