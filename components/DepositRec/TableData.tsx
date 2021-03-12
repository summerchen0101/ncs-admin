import BasicTable from '@/components/BasicTable'
import TipIconButton from '@/components/TipIconButton'
import { ProcessStatus } from '@/lib/enums'
import { processStatusOpts } from '@/lib/options'
import { WithdrawRec } from '@/types/api/WithdrawRec'
import useWithdrawRecService from '@/utils/services/useWithdrawRecService'
import useTransfer from '@/utils/useTransfer'
import { HStack, Icon, Tag, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'
import { HiCheck, HiPencilAlt } from 'react-icons/hi'
import ColorText from '../ColorText'
import TableSummary from '../TableSummary'
import TableSummaryItem from '../TableSummaryItem'

function TableData({ list }: { list: WithdrawRec[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById } = useWithdrawRecService()
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const columns: ColumnsType<WithdrawRec> = useMemo(
    () => [
      { title: '儲值單號', render: (_, row) => 'c0vg21tnf4qap9a9cp30' },
      {
        title: '帳號/暱稱',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
      },
      {
        title: '儲值金額',
        render: (_, row) => (
          <Text color="blue.500" fontWeight="bold">
            ${toCurrency(2000)}
          </Text>
        ),
      },

      { title: '付款方式', render: (_, row) => 'ATM' },
      // {
      //   title: '付款通知',
      //   render: (_, row) => (
      //     <Icon as={HiCheck} fontSize="25px" color="brand.500" />
      //   ),
      //   align: 'center',
      // },
      {
        title: '訂單狀態',
        render: (_, row) => (
          <Tag colorScheme="green" variant="solid" borderRadius="sm">
            已完成
          </Tag>
        ),
      },

      { title: '申請時間', render: (_, row) => toDateTime(row.created_at) },
      { title: '付款時間', render: (_, row) => toDateTime(row.created_at) },
      { title: '截止時間', render: (_, row) => toDateTime(row.created_at) },

      // { title: '審核人員', render: (_, row) => '-' },
      // { title: '審核時間', render: (_, row) => '-' },
      // { title: '入點時間', render: (_, row) => '-' },
      // {
      //   title: '審核',
      //   render: (_, row) => (
      //     <HStack my="-4">
      //       <TipIconButton
      //         label="審核"
      //         colorScheme="purple"
      //         icon={<HiPencilAlt />}
      //         onClick={() => fetchById(row.id)}
      //         disabled={row.status !== ProcessStatus.Pending}
      //       />
      //     </HStack>
      //   ),
      // },
    ],
    [],
  )
  return (
    <>
      {/* <TableSummary>
        <TableSummaryItem label="筆數" num={list.length} decimal={0} />
        <TableSummaryItem label="累積金額" num={100000} />
        <TableSummaryItem label="已付款金額" num={80000}>
          <Text as="span" color="orange.400">
            {toCurrency(80000)}
          </Text>
        </TableSummaryItem>
      </TableSummary> */}
      <BasicTable columns={columns} data={list} />
    </>
  )
}

export default TableData
