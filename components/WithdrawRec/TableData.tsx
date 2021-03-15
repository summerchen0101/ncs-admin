import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { ProcessStatus } from '@/lib/enums'
import { processStatusOpts } from '@/lib/options'
import { WithdrawRec } from '@/types/api/WithdrawRec'
import useWithdrawRecService from '@/utils/services/useWithdrawRecService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Tag, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiPencilAlt } from 'react-icons/hi'

function TableData({ list }: { list: WithdrawRec[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById } = useWithdrawRecService()
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const columns: ColumnsType<WithdrawRec> = useMemo(
    () => [
      { title: '提领单号', render: (_, row) => 'c0vg21tnf4qap9a9cp30' },
      {
        title: '帐号/暱称',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
      },
      {
        title: '提领金额',
        render: (_, row) => (
          <Text color="blue.500" fontWeight="bold">
            ${toCurrency(2000)}
          </Text>
        ),
      },
      { title: '申请时间', render: (_, row) => toDateTime(row.created_at) },
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
      { title: '出款金额', render: (_, row) => '$1,900.00' },
      { title: '审核人员', render: (_, row) => '-' },
      { title: '审核时间', render: (_, row) => '-' },
      { title: '拨款时间', render: (_, row) => '-' },
      {
        title: '审核',
        render: (_, row) => (
          <HStack my="-4">
            <TipIconButton
              label="审核"
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
