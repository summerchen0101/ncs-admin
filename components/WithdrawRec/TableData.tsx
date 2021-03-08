import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { ProcessStatus } from '@/lib/enums'
import { processStatusOpts } from '@/lib/options'
import { WithdrawRec } from '@/types/api/WithdrawRec'
import useWithdrawRecService from '@/utils/services/useWithdrawRecService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiPencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: WithdrawRec[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById } = useWithdrawRecService()
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const columns: ColumnsType<WithdrawRec> = useMemo(
    () => [
      { title: '提領單號', render: (_, row) => 'c0vg21tnf4qap9a9cp30' },
      {
        title: '帳號/暱稱',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
      },
      { title: '提領金額', render: (_, row) => `$${toCurrency(2000)}` },
      { title: '申請時間', render: (_, row) => toDateTime(row.created_at) },
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
      { title: '出款金額', render: (_, row) => '$1,900.00' },
      { title: '審核人員', render: (_, row) => '-' },
      { title: '審核時間', render: (_, row) => '-' },
      { title: '撥款時間', render: (_, row) => '-' },
      {
        title: '審核',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="審核"
              colorScheme="purple"
              icon={<HiPencilAlt />}
              onClick={() => fetchById(row.id)}
              disabled={!!row.accounting_at}
            />
          </HStack>
        ),
      },
    ],
    [],
  )
  return <BasicTable columns={columns} data={list} />
}

export default TableData
