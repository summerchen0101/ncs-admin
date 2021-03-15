import BasicTable from '@/components/BasicTable'
import { WithdrawRec } from '@/types/api/WithdrawRec'
import useWithdrawRecService from '@/utils/services/useWithdrawRecService'
import useTransfer from '@/utils/useTransfer'
import { Tag, Text } from '@chakra-ui/react'
import { ColumnsType } from 'antd/lib/table'
import React, { useMemo } from 'react'

function TableData({ list }: { list: WithdrawRec[] }) {
  const { toDateTime } = useTransfer()
  const { fetchById } = useWithdrawRecService()
  const { toOptionName, toDate, toCurrency } = useTransfer()
  const columns: ColumnsType<WithdrawRec> = useMemo(
    () => [
      { title: '储值单号', render: (_, row) => 'c0vg21tnf4qap9a9cp30' },
      {
        title: '帐号/暱称',
        render: (_, row) => `${row.member.acc} [${row.member.name}]`,
      },
      {
        title: '储值金额',
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
        title: '订单状态',
        render: (_, row) => (
          <Tag colorScheme="green" variant="solid" borderRadius="sm">
            已完成
          </Tag>
        ),
      },

      { title: '申请时间', render: (_, row) => toDateTime(row.created_at) },
      { title: '付款时间', render: (_, row) => toDateTime(row.created_at) },
      { title: '截止时间', render: (_, row) => toDateTime(row.created_at) },

      // { title: '审核人员', render: (_, row) => '-' },
      // { title: '审核时间', render: (_, row) => '-' },
      // { title: '入点时间', render: (_, row) => '-' },
      // {
      //   title: '审核',
      //   render: (_, row) => (
      //     <HStack my="-4">
      //       <TipIconButton
      //         label="审核"
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
        <TableSummaryItem label="笔数" num={list.length} decimal={0} />
        <TableSummaryItem label="累积金额" num={100000} />
        <TableSummaryItem label="已付款金额" num={80000}>
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
